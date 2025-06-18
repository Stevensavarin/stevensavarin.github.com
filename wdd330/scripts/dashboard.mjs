import { getLoggedInUser, logoutUser, updateNavbarAuthState } from './authHelpers.mjs';

const GNEWS_KEY = 'af0fbcf9318ebc65e31038f5e2f36c74';
const SPOON_KEY = 'c2de76c79c9541b8b6b9dd30d7fd6c78';

export function initDashboard() {
  updateNavbarAuthState();
  const user = getLoggedInUser();

  if (!user) {
    window.location.hash = '#/login';
    return;
  }

  document.getElementById('user-name').textContent = `${user.firstName} ${user.lastName}`;

  loadNews();
  loadDailyRecipe();
}

// Noticias de comida con GNews API
async function loadNews() {
  try {
    const url = `https://gnews.io/api/v4/search?q=comida&lang=es&country=ES&token=${GNEWS_KEY}&max=3`; 
    
    console.log(`dashboard.mjs: Cargando noticias de GNews API: ${url}`);

    const res = await fetch(url);
    
    if (!res.ok) {
        console.error(`dashboard.mjs: Error al cargar noticias de GNews: HTTP status ${res.status}`);
        throw new Error(`Error HTTP! Estado: ${res.status}`);
    }

    const data = await res.json();
    const articles = data.articles || [];

    if (articles.length === 0) {
      document.getElementById('news-container').innerHTML = '<li>No hay noticias disponibles.</li>';
      console.log("dashboard.mjs: No se encontraron noticias.");
      return;
    }

    document.getElementById('news-container').innerHTML = articles.map(a => `
      <li class="news-item">
        <a href="${a.url}" target="_blank">${a.title}</a>
        <p>${a.description || ''}</p>
      </li>`).join('');
    console.log("dashboard.mjs: Noticias cargadas exitosamente.");

  } catch (err) {
    console.error('dashboard.mjs: Error al cargar noticias:', err);
    document.getElementById('news-container').innerHTML = `<li>Error cargando noticias.</li>`;
  }
}

// Receta Aleatoria Spoonacular
async function loadDailyRecipe() {
  try {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${SPOON_KEY}&number=1`;
    
    console.log(`dashboard.mjs: Cargando receta diaria de Spoonacular: ${url}`);

    const res = await fetch(url);
    
    if (!res.ok) {
        console.error(`dashboard.mjs: Error al cargar receta diaria: HTTP status ${res.status}`);
        throw new Error(`Error HTTP! Estado: ${res.status}`);
    }

    const data = await res.json();
    const r = data.recipes?.[0];
    if (!r) {
      console.log("dashboard.mjs: No se obtuvo ninguna receta diaria.");
      throw new Error('No hay receta');
    }

    document.getElementById('daily-recipe').innerHTML = `
      <img src="${r.image}" alt="${r.title}">
      <h4>${r.title}</h4>
      <p>Tiempo: ${r.readyInMinutes} min · Porciones: ${r.servings}</p>
      <a href="${r.sourceUrl}" target="_blank" class="btn">Ver receta completa</a>
    `;
    console.log("dashboard.mjs: Receta diaria cargada exitosamente.");

  } catch (err) {
    console.error('dashboard.mjs: Error receta diaria:', err);
    document.getElementById('daily-recipe').innerHTML = `<p>Error cargando receta.</p>`;
  }
}

