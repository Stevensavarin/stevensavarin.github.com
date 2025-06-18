import { getLoggedInUser, isPremiumUser } from './authHelpers.mjs';
import { REPO_BASE_URL } from './config.mjs';

export async function loadRecipes() {
  //console.log("recipes.mjs: loadRecipes() iniciado.");
  const container = document.getElementById('recipesContainer');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const categoryFilter = document.getElementById('categoryFilter');
  const premiumFilter = document.getElementById('premiumFilter');
  const easyFilter = document.getElementById('easyFilter'); 
  const mediumFilter = document.getElementById('mediumFilter');
  const servingsFilter = document.getElementById('servingsFilter');
  const favoritesFilter = document.getElementById('favoritesFilter');

  let allRecipes = [];

  try {
    const fullJsonUrl = `${window.location.origin}${REPO_BASE_URL}public/data/recipes.json`;
    //console.log(`recipes.mjs: Fetching recipes.json from: ${fullJsonUrl}`);
    const res = await fetch(fullJsonUrl); 
    if (!res.ok) {
      //console.error(`recipes.mjs: Error fetching recipes.json. URL: ${fullJsonUrl} Status: ${res.status}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    allRecipes = await res.json();
    //console.log("recipes.mjs: Recetas cargadas exitosamente.");
    populateCategoryFilter(allRecipes);
    applyFiltersAndSort();
  } catch (err) {
    //console.error("recipes.mjs: Error al cargar recipes.json:", err);
    if (container) {
      container.innerHTML = '<p>Error al cargar las recetas.</p>';
    } else {
      //console.error("recipes.mjs: recipesContainer no encontrado para mostrar error.");
    }
  }

  const handleFavoriteButtonClick = (event) => {
    //console.log("recipes.mjs: Clic en botón de favorito detectado.");
    const btn = event.target.closest('.favorite-btn');
    if (btn) {
      const id = parseInt(btn.dataset.id);
      let currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

      if (currentFavorites.includes(id)) {
        currentFavorites = currentFavorites.filter(favId => favId !== id);
        //console.log(`recipes.mjs: Receta ${id} eliminada de favoritos.`);
      } else {
        currentFavorites.push(id);
        //console.log(`recipes.mjs: Receta ${id} añadida a favoritos.`);
      }

      localStorage.setItem('favorites', JSON.stringify(currentFavorites));
      applyFiltersAndSort();
    }
  };

  if (container) {
      container.addEventListener('click', handleFavoriteButtonClick);
      //console.log("recipes.mjs: Listener de delegación de favoritos adjunto al container.");
  } else {
      //console.error("recipes.mjs: recipesContainer no encontrado para adjuntar listener de favoritos.");
  }

  searchInput.addEventListener('input', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
  categoryFilter.addEventListener('change', applyFiltersAndSort);
  premiumFilter.addEventListener('change', applyFiltersAndSort);
  easyFilter.addEventListener('change', applyFiltersAndSort);
  mediumFilter.addEventListener('change', applyFiltersAndSort);
  servingsFilter.addEventListener('input', applyFiltersAndSort);
  favoritesFilter.addEventListener('change', applyFiltersAndSort);
  //console.log("recipes.mjs: Listeners de filtros y ordenamiento adjuntos.");

  function applyFiltersAndSort() {
    //console.log("recipes.mjs: applyFiltersAndSort() iniciado.");
    let filteredRecipes = [...allRecipes];
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.instructions.toLowerCase().includes(searchTerm) ||
        (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)))
      );
      //console.log(`recipes.mjs: Filtrado por término: '${searchTerm}'. Resultados: ${filteredRecipes.length}`);
    }

    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
      //console.log(`recipes.mjs: Filtrado por categoría: '${selectedCategory}'. Resultados: ${filteredRecipes.length}`);
    }

    if (premiumFilter.checked) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.isPremium);
      //console.log(`recipes.mjs: Filtrado por Premium. Resultados: ${filteredRecipes.length}`);
    }

    const selectedDifficulties = [];
    if (easyFilter.checked) selectedDifficulties.push('Fácil');
    if (mediumFilter.checked) selectedDifficulties.push('Media');
    if (selectedDifficulties.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        selectedDifficulties.includes(recipe.difficulty)
      );
      //console.log(`recipes.mjs: Filtrado por dificultad: ${selectedDifficulties.join(', ')}. Resultados: ${filteredRecipes.length}`);
    }

    const minServings = parseInt(servingsFilter.value);
    if (!isNaN(minServings) && minServings > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.servings >= minServings);
      //console.log(`recipes.mjs: Filtrado por raciones mínimas: ${minServings}. Resultados: ${filteredRecipes.length}`);
    }

    if (favoritesFilter.checked) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        currentFavorites.includes(recipe.id)
      );
      //console.log(`recipes.mjs: Filtrado por favoritos. Resultados: ${filteredRecipes.length}`);
    }

    const sortBy = sortSelect.value;
    //console.log(`recipes.mjs: Ordenando por: ${sortBy}`);
    switch (sortBy) {
      case 'az':
        filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'timeAsc':
        filteredRecipes.sort((a, b) => parseInt(a.time) - parseInt(b.time));
        break;
      case 'timeDesc':
        filteredRecipes.sort((a, b) => parseInt(b.time) - parseInt(a.time));
        break;
      case 'servingsAsc':
        filteredRecipes.sort((a, b) => (a.servings || 0) - (b.servings || 0));
        break;
      case 'servingsDesc':
        filteredRecipes.sort((a, b) => (b.servings || 0) - (a.servings || 0));
        break;
    }

    displayRecipes(filteredRecipes);
    //console.log("recipes.mjs: applyFiltersAndSort() finalizado.");
  }

  function displayRecipes(recetas) {
    //console.log(`recipes.mjs: displayRecipes() iniciado. Recetas a mostrar: ${recetas.length}`);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (recetas.length === 0) {
      container.innerHTML = '<p class="no-recipes-message">No se encontraron recetas con los filtros aplicados.</p>';
      //console.log("recipes.mjs: No se encontraron recetas, mostrando mensaje.");
      return;
    }

    container.innerHTML = recetas.map(recipe => {
      const isFavorite = favorites.includes(recipe.id);
      return `
        <div class="recipe-card ${recipe.isPremium ? 'premium' : ''}">
          <img src="${window.location.origin}${REPO_BASE_URL}${recipe.image}" alt="${recipe.title}"> 
          <h3>${recipe.title}</h3>
          <p><strong>Tiempo:</strong> ${recipe.time}</p>
          <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
          <p><strong>Raciones:</strong> ${recipe.servings || 'N/A'}</p>
          <p><strong>Categoría:</strong> ${recipe.category}</p>
          <button class="favorite-btn" data-id="${recipe.id}" title="Agregar a favoritos">
            ${isFavorite ? '❤️' : '🤍'}
          </button>
          ${recipe.isPremium ? '<span class="badge">Premium</span>' : ''}
        </div>
      `;
    }).join('');
    //console.log("recipes.mjs: Recetas renderizadas.");
  }

  function populateCategoryFilter(recipes) {
    //console.log("recipes.mjs: populateCategoryFilter() iniciado.");
    const categories = [...new Set(recipes.map(r => r.category))].sort();
    categoryFilter.innerHTML = '<option value="">Todas las Categorías</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
    //console.log(`recipes.mjs: Filtro de categoría populado con ${categories.length} categorías.`);
  }

  document.getElementById('recipesContainer').addEventListener('click', (e) => {
    console.log("recipes.mjs: Clic en recipesContainer detectado.");
    if (e.target.classList.contains('favorite-btn')) {
      //console.log("recipes.mjs: Clic en botón de favorito, ignorando navegación de tarjeta.");
      return;
    }

    const card = e.target.closest('.recipe-card');
    if (!card) {
      //console.log("recipes.mjs: Clic no fue en una tarjeta de receta.");
      return;
    }

    const title = card.querySelector('h3').textContent;
    const recipe = allRecipes.find(r => r.title === title);
    if (!recipe) {
      //console.warn(`recipes.mjs: Receta con título '${title}' no encontrada en allRecipes.`);
      return;
    }

    const user = getLoggedInUser();
    //console.log(`recipes.mjs: Usuario actual al clic de tarjeta: ${user ? user.username : 'N/A'}`);

    if (recipe.isPremium && !isPremiumUser(user)) {
      //console.log("recipes.mjs: Receta Premium, usuario no premium. Mostrando modal.");
      showUpgradeModal();
      return;
    }

    const navigateToUrl = `${window.location.origin}${REPO_BASE_URL}#/receta?id=${recipe.id}`;
    //console.log(`recipes.mjs: Navegando a detalle de receta (URL completa): ${navigateToUrl}`);
    window.location.href = navigateToUrl;
  });

  function showUpgradeModal() {
    //console.log("recipes.mjs: showUpgradeModal() iniciado.");
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
      <div class="modal">
        <h2>¡Contenido Premium!</h2>
        <p>Esta receta está disponible solo para usuarios con plan Premium.</p>
        <a href="${window.location.origin}${REPO_BASE_URL}#/dashboard" class="btn-upgrade">Mejorar Plan</a> 
        <button id="closeModal">Cerrar</button>
      </div>
    `;
    document.body.appendChild(modal);
    //console.log("recipes.mjs: Modal de upgrade añadido al DOM.");
    
    document.getElementById('closeModal').addEventListener('click', () => {
      //console.log("recipes.mjs: Clic en cerrar modal.");
      modal.remove();
    });

    modal.querySelector('.btn-upgrade').addEventListener('click', (e) => {
      //console.log("recipes.mjs: Clic en Mejorar Plan del modal.");
      e.preventDefault(); 
      modal.remove(); 
      window.location.href = e.currentTarget.href; 
    });
    //console.log("recipes.mjs: Listeners de modal adjuntos.");
  }
  //console.log("recipes.mjs: loadRecipes() finalizado.");
}

