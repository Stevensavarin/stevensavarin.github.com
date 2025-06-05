export async function loadRecipes() {
  const container = document.getElementById('recipesContainer');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const categoryFilter = document.getElementById('categoryFilter');
  const premiumFilter = document.getElementById('premiumFilter');
  const easyFilter = document.getElementById('easyFilter');
  const mediumFilter = document.getElementById('mediumFilter');
  const servingsFilter = document.getElementById('servingsFilter');

  let allRecipes = []; // Para guardar la lista original de recetas

  try {
    const res = await fetch('public/data/recipes.json');
    allRecipes = await res.json();
    console.log("Recetas cargadas:", allRecipes);

    // Llenar dinámicamente las opciones del filtro de categoría
    populateCategoryFilter(allRecipes);

    // Mostrar todas las recetas inicialmente
    applyFiltersAndSort();
  } catch (err) {
    container.innerHTML = '<p>Error al cargar las recetas.</p>';
    console.error("Error al cargar recipes.json:", err);
  }

  // Event Listeners para todos los filtros y ordenamiento
  searchInput.addEventListener('input', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
  categoryFilter.addEventListener('change', applyFiltersAndSort);
  premiumFilter.addEventListener('change', applyFiltersAndSort);
  easyFilter.addEventListener('change', applyFiltersAndSort);
  mediumFilter.addEventListener('change', applyFiltersAndSort);
  servingsFilter.addEventListener('input', applyFiltersAndSort);


  // Función central para aplicar todos los filtros y ordenar
  function applyFiltersAndSort() {
    let filteredRecipes = [...allRecipes]; // Siempre todas las recetas al empezar

    // Filtrar por búsqueda de título/descripción/ingredientes
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.instructions.toLowerCase().includes(searchTerm) ||
        (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)))
      );
    }

    // Filtrar por Categoría
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
    }

    // Filtrar por Premium
    if (premiumFilter.checked) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.isPremium);
    }

    // 4. Filtrar por Dificultad
    const selectedDifficulties = [];
    if (easyFilter.checked) selectedDifficulties.push('Fácil');
    if (mediumFilter.checked) selectedDifficulties.push('Media');
    // TODO 'Difícil' en JSON al agregar la dificultad difícil:
    // if (hardFilter && hardFilter.checked) selectedDifficulties.push('Difícil');

    if (selectedDifficulties.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        selectedDifficulties.includes(recipe.difficulty)
      );
    }

    // Filtrar por Raciones
    const minServings = parseInt(servingsFilter.value);
    if (!isNaN(minServings) && minServings > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.servings >= minServings);
    }

    // Ordenar
    const sortBy = sortSelect.value;
    switch (sortBy) {
      case 'az':
        filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'timeAsc':
        filteredRecipes.sort((a, b) => {
          // Convierto "10 min" a 10 para poder comparar
          const timeA = parseInt(a.time.replace(' min', ''));
          const timeB = parseInt(b.time.replace(' min', ''));
          return timeA - timeB;
        });
        break;
      case 'timeDesc':
        filteredRecipes.sort((a, b) => {
          const timeA = parseInt(a.time.replace(' min', ''));
          const timeB = parseInt(b.time.replace(' min', ''));
          return timeB - timeA;
        });
        break;
      case 'servingsAsc':
        filteredRecipes.sort((a, b) => (a.servings || 0) - (b.servings || 0)); // handle potential undefined
        break;
      case 'servingsDesc':
        filteredRecipes.sort((a, b) => (b.servings || 0) - (a.servings || 0)); // handle potential undefined
        break;
      // Puedo añadir más opciones de ordenación aquí
    }

    displayRecipes(filteredRecipes); // Actualizar la vista con las recetas filtradas y ordenadas
  }

  // Función para renderizar las recetas en el DOM
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

  // Función para poblar dinámicamente las opciones del filtro de categoría
  // Esto es útil para no actualizar el HTML si tengo que añadir nuevas categorías
  function populateCategoryFilter(recipes) {
    // Obtener categorías únicas y ordenarlas alfabéticamente
    const categories = [...new Set(recipes.map(r => r.category))].sort();

    // Asegurarme de que 'Todas las Categorías' sea la primera opción
    categoryFilter.innerHTML = '<option value="">Todas las Categorías</option>';

    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }
}

