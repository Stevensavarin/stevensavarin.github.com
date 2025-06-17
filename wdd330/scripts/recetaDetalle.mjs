const container = document.getElementById('recipeDetailContainer');
const user = JSON.parse(localStorage.getItem('user'));
console.log('User desde script:', user);

const userIsPremium = user && (user.isPremium || (user.roles && user.roles.includes('premium')));
console.log('¿Es usuario premium?', userIsPremium);

async function loadRecipeDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  try {
    const res = await fetch('public/data/recipes.json');
    const data = await res.json();
    const recipe = data.find(r => r.id === id);

    if (!recipe) {
      container.innerHTML = '<p>Receta no encontrada.</p>';
      return;
    }

    if (recipe.isPremium && !userIsPremium) {
      container.innerHTML = `
        <div class="premium-warning">
          <h2>🔒 ¡Contenido Premium!</h2>
          <p>Esta receta está disponible solo para usuarios con plan Premium.</p>
          <button id="upgradeBtn">Mejorar Plan</button>
          <button id="volverBtn">Volver</button>
        </div>
      `;

      document.getElementById('upgradeBtn').addEventListener('click', () => {
        window.location.href = '/#/suscripcion';
      });

      document.getElementById('volverBtn').addEventListener('click', () => {
        window.location.href = '/#/recetas';
      });

      return;
    }

    // Mostrar receta
    container.innerHTML = `
      <div class="recipe-detail">
        <h1>${recipe.title}</h1>
        <img src="/${recipe.image}" alt="${recipe.title}">
        <p><strong>Tiempo:</strong> ${recipe.time}</p>
        <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
        <p><strong>Raciones:</strong> ${recipe.servings}</p>
        <p><strong>Categoría:</strong> ${recipe.category}</p>
        <h2>Ingredientes</h2>
        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
        <h2>Preparación</h2>
        <p>${recipe.instructions}</p>
        <button id="volverBtn">Volver a Recetas</button>
      </div>
    `;

    document.getElementById('volverBtn').addEventListener('click', () => {
      window.location.href = '/#/recetas';
    });

  } catch (err) {
    console.error("Error al cargar la receta:", err);
    container.innerHTML = '<p>Hubo un error al cargar la receta.</p>';
  }
}

loadRecipeDetail();