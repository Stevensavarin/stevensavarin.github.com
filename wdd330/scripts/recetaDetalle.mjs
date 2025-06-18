const container = document.getElementById('recipeDetailContainer');

const handleDetailButtonClick = (event) => {
    if (event.target.id === 'volverBtn') {
        window.location.href = '/#/recetas'; 
    } 
    else if (event.target.id === 'upgradeBtn') {
        window.location.href = '/#/suscripcion';
    }
};

let isDetailListenerAttached = false;

export async function loadRecipeDetail() {
    const currentContainer = document.getElementById('recipeDetailContainer');

    if (!isDetailListenerAttached) {
        document.body.addEventListener('click', handleDetailButtonClick);
        isDetailListenerAttached = true;
    }

    const hash = window.location.hash;
    const queryStringInHash = hash.split('?')[1];

    let id = null;
    if (queryStringInHash) {
        const params = new URLSearchParams(queryStringInHash);
        id = parseInt(params.get('id'));
    }

    if (isNaN(id) || id === null) {
        if (currentContainer) currentContainer.innerHTML = '<p>ID de receta no válido.</p>';
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userIsPremium = user && (user.isPremium || (user.roles && user.roles.includes('premium')));

    try {
        const res = await fetch('/public/data/recipes.json');
        const data = await res.json();
        const recipe = data.find(r => r.id === id);

        if (!recipe) {
            if (currentContainer) currentContainer.innerHTML = '<p>Receta no encontrada.</p>';
            return;
        }

        if (recipe.isPremium && !userIsPremium) {
            if (currentContainer) {
                currentContainer.innerHTML = `
                    <div class="premium-warning">
                      <h2>🔒 ¡Contenido Premium!</h2>
                      <p>Esta receta está disponible solo para usuarios con plan Premium.</p>
                      <button id="upgradeBtn">Mejorar Plan</button>
                      <button id="volverBtn">Volver</button>
                    </div>
                `;
            }
        } 
        else {
            if (currentContainer) {
                currentContainer.innerHTML = `
                    <div class="recipe-detail">
                      <h1>${recipe.title}</h1>
                      <img src="/${recipe.image}" alt="${recipe.title}"> <p><strong>Tiempo:</strong> ${recipe.time}</p>
                      <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
                      <p><strong>Raciones:</strong> ${recipe.servings || 'N/A'}</p>
                      <p><strong>Categoría:</strong> ${recipe.category}</p>
                      <h2>Ingredientes</h2>
                      <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                      <h2>Preparación</h2>
                      <p>${recipe.instructions}</p>
                      <button id="volverBtn">Volver a Recetas</button>
                    </div>
                `;
            }
        }

    } catch (err) {
        console.error("Error al cargar la receta:", err);
        if (currentContainer) currentContainer.innerHTML = '<p>Hubo un error al cargar la receta.</p>';
    }
}
// loadRecipeDetail();

