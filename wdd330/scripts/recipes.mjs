export async function loadRecipes() {
  const container = document.getElementById('recipesContainer');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const categoryFilter = document.getElementById('categoryFilter');
  const premiumFilter = document.getElementById('premiumFilter');
  const easyFilter = document.getElementById('easyFilter');
  const mediumFilter = document.getElementById('mediumFilter');
  const servingsFilter = document.getElementById('servingsFilter');

  let allRecipes = [];

  try {
    const res = await fetch('public/data/recipes.json');
    allRecipes = await res.json();
    console.log("Recetas cargadas:", allRecipes);

    populateCategoryFilter(allRecipes);
    applyFiltersAndSort();
  } catch (err) {
    container.innerHTML = '<p>Error al cargar las recetas.</p>';
    console.error("Error al cargar recipes.json:", err);
  }

  searchInput.addEventListener('input', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
  categoryFilter.addEventListener('change', applyFiltersAndSort);
  premiumFilter.addEventListener('change', applyFiltersAndSort);
  easyFilter.addEventListener('change', applyFiltersAndSort);
  mediumFilter.addEventListener('change', applyFiltersAndSort);
  servingsFilter.addEventListener('input', applyFiltersAndSort);

  function applyFiltersAndSort() {
    let filteredRecipes = [...allRecipes];

    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.instructions.toLowerCase().includes(searchTerm) ||
        (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)))
      );
    }

    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
    }

    if (premiumFilter.checked) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.isPremium);
    }

    const selectedDifficulties = [];
    if (easyFilter.checked) selectedDifficulties.push('Fácil');
    if (mediumFilter.checked) selectedDifficulties.push('Media');
    if (selectedDifficulties.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        selectedDifficulties.includes(recipe.difficulty)
      );
    }

    const minServings = parseInt(servingsFilter.value);
    if (!isNaN(minServings) && minServings > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.servings >= minServings);
    }

    const sortBy = sortSelect.value;
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
  }

  function displayRecipes(recetas) {
    if (recetas.length === 0) {
      container.innerHTML = '<p class="no-recipes-message">No se encontraron recetas con los filtros aplicados.</p>';
      return;
    }

    container.innerHTML = recetas.map(recipe => `
      <div class="recipe-card ${recipe.isPremium ? 'premium' : ''}">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p><strong>Tiempo:</strong> ${recipe.time}</p>
        <p><strong>Dificultad:</strong> ${recipe.difficulty}</p>
        <p><strong>Raciones:</strong> ${recipe.servings || 'N/A'}</p>
        <p><strong>Categoría:</strong> ${recipe.category}</p>
        ${recipe.isPremium ? '<span class="badge">Premium</span>' : ''}
      </div>
    `).join('');
  }

  function populateCategoryFilter(recipes) {
    const categories = [...new Set(recipes.map(r => r.category))].sort();
    categoryFilter.innerHTML = '<option value="">Todas las Categorías</option>';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  // ✅ NUEVO: Click en receta
  document.getElementById('recipesContainer').addEventListener('click', (e) => {
    const card = e.target.closest('.recipe-card');
    if (!card) return;

    const title = card.querySelector('h3').textContent;
    const recipe = allRecipes.find(r => r.title === title);
    if (!recipe) return;

    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const isPremiumUser = user?.isPremium;

    if (recipe.isPremium && !isPremiumUser) {
      showUpgradeModal();
      return;
    }

    window.location.href = `/routes/receta.html?id=${recipe.id}`;
  });

  function showUpgradeModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
      <div class="modal">
        <h2>¡Contenido Premium!</h2>
        <p>Esta receta está disponible solo para usuarios con plan Premium.</p>
        <a href="/#/dashboard" class="btn-upgrade">Mejorar Plan</a>
        <button id="closeModal">Cerrar</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('closeModal').addEventListener('click', () => {
      modal.remove();
    });
  }
}
