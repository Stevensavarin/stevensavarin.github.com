// const container = document.getElementById('recipeDetailContainer');
// const user = JSON.parse(localStorage.getItem('user'));
// const userIsPremium = user && (user.isPremium || (user.roles && user.roles.includes('premium')));
let isListenerAttached = false;

const handleDetailButtonClick = (event) => {
    if (event.target.id === 'volverBtn') {
        console.log('Botón "Volver a Recetas" clicado.');
        window.location.href = '/#/recetas';
        console.log('Navegación solicitada a: /#/recetas');
    } else if (event.target.id === 'upgradeBtn') {
        console.log('Botón "Mejorar Plan" clicado.');
        window.location.href = '/#/login';
        console.log('Navegación solicitada a: /#/login');
    }
};

export async function loadRecipeDetail() {
    const container = document.getElementById('recipeDetailContainer');
    const user = JSON.parse(localStorage.getItem('user'));
    const userIsPremium = user && (user.isPremium || (user.roles && user.roles.includes('premium')));

    if (container && !isListenerAttached) {
        container.addEventListener('click', handleDetailButtonClick);
        isListenerAttached = true;
        console.log("Listener de detalle de receta adjuntado al container.");
    } else if (!container) {
        console.error("Error: recipeDetailContainer no encontrado al intentar adjuntar listener.");
    }


    const hash = window.location.hash;
    const queryStringInHash = hash.split('?')[1];

    let id = null;
    if (queryStringInHash) {
        const params = new URLSearchParams(queryStringInHash);
        id = parseInt(params.get('id'));
    }

    if (isNaN(id) || id === null) {
        if (container) container.innerHTML = '<p>ID de receta no válido.</p>';
        console.error("ID de receta no válido o ausente en la URL del hash.");
        return;
    }

    try {
        const res = await fetch('public/data/recipes.json');
        const data = await res.json();
        const recipe = data.find(r => r.id === id);

        if (!recipe) {
            if (container) container.innerHTML = '<p>Receta no encontrada.</p>';
            console.warn(`Receta con ID ${id} no encontrada.`);
            return;
        }

        // Logs para depuración
        console.log('User desde script:', user);
        console.log('¿Es usuario premium?', userIsPremium);


        if (recipe.isPremium && !userIsPremium) {
            if (container) { // Asegurarse de que container existe antes de manipular innerHTML
                container.innerHTML = `
                    <div class="premium-warning">
                      <h2>🔒 ¡Contenido Premium!</h2>
                      <p>Esta receta está disponible solo para usuarios con plan Premium.</p>
                      <button id="upgradeBtn">Mejorar Plan</button>
                      <button id="volverBtn">Volver</button>
                    </div>
                `;
            }
        } else {
            if (container) { // Asegurarse de que container existe antes de manipular innerHTML
                container.innerHTML = `
                    <div class="recipe-detail">
                      <h1>${recipe.title}</h1>
                      <img src="/${recipe.image}" alt="${recipe.title}">
                      <p><strong>Tiempo:</strong> ${recipe.time}</p>
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
        if (container) container.innerHTML = '<p>Hubo un error al cargar la receta.</p>';
    }
}

// loadRecipeDetail();

