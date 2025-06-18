// scripts/recetaDetalle.mjs
import { BASE_URL } from './config.mjs'; 

const container = document.getElementById('recipeDetailContainer');

const handleDetailButtonClick = (event) => {
    console.log('recetaDetalle.mjs: Clic detectado en el body.', { targetId: event.target.id });
    if (event.target.id === 'volverBtn') {
        window.location.href = '/#/recetas'; 
        console.log('recetaDetalle.mjs: Redirigiendo a /#/recetas');
    } 
    else if (event.target.id === 'upgradeBtn') {
        window.location.href = `${BASE_URL}/#/suscripcion`; 
        console.log('recetaDetalle.mjs: Redirigiendo a Mejorar Plan');
    }
};

let isDetailListenerAttached = false;

export async function loadRecipeDetail() {
    console.log('recetaDetalle.mjs: loadRecipeDetail() iniciado.');

    const currentContainer = document.getElementById('recipeDetailContainer'); // Obtener la referencia actual
    console.log('recetaDetalle.mjs: recipeDetailContainer actual:', currentContainer);

    if (!isDetailListenerAttached) {
        document.body.addEventListener('click', handleDetailButtonClick);
        isDetailListenerAttached = true;
        console.log("recetaDetalle.mjs: Listener de delegación adjunto al body por primera vez.");
    }

    const hash = window.location.hash;
    const queryStringInHash = hash.split('?')[1];
    console.log('recetaDetalle.mjs: Hash:', hash, 'QueryString en Hash:', queryStringInHash);

    let id = null;
    if (queryStringInHash) {
        const params = new URLSearchParams(queryStringInHash);
        id = parseInt(params.get('id'));
        console.log('recetaDetalle.mjs: ID extraído:', id);
    }

    if (isNaN(id) || id === null) {
        if (currentContainer) currentContainer.innerHTML = '<p>ID de receta no válido.</p>';
        console.error("recetaDetalle.mjs: ID de receta no válido o ausente en la URL del hash.");
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userIsPremium = user && (user.isPremium || (user.roles && user.roles.includes('premium')));

    console.log('recetaDetalle.mjs: User desde script:', user); 
    console.log('recetaDetalle.mjs: ¿Es usuario premium?', userIsPremium);

    try {
        console.log(`recetaDetalle.mjs: Cargando recipes.json desde ${BASE_URL}/public/data/recipes.json`);
        const res = await fetch(`${BASE_URL}/public/data/recipes.json`);
        const data = await res.json();
        const recipe = data.find(r => r.id === id);
        console.log('recetaDetalle.mjs: Receta encontrada:', recipe);

        if (!recipe) {
            if (currentContainer) currentContainer.innerHTML = '<p>Receta no encontrada.</p>';
            console.warn(`recetaDetalle.mjs: Receta con ID ${id} no encontrada.`);
            return;
        }

        if (recipe.isPremium && !userIsPremium) {
            console.log('recetaDetalle.mjs: Receta Premium detectada, usuario NO premium. Mostrando modal.');
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
            console.log('recetaDetalle.mjs: Mostrando detalles de la receta.');
            if (currentContainer) {
                currentContainer.innerHTML = `
                    <div class="recipe-detail">
                      <h1>${recipe.title}</h1>
                      <img src="${BASE_URL}/${recipe.image}" alt="${recipe.title}"> 
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
        console.error("recetaDetalle.mjs: Error al cargar la receta:", err);
        if (currentContainer) currentContainer.innerHTML = '<p>Hubo un error al cargar la receta.</p>';
    }
    console.log('recetaDetalle.mjs: loadRecipeDetail() finalizado.');
}

// loadRecipeDetail();

