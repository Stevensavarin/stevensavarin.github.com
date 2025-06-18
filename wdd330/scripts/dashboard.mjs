import { getLoggedInUser, logoutUser, updateNavbarAuthState } from './authHelpers.mjs';

const MEDIASTACK_KEY = '96c243749ea99b5472e1a083113a7e42';
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

  //document.getElementById('logoutBtn').addEventListener('click', (e) => {
   // e.preventDefault();
   // logoutUser();
 // });
}

// Noticias foodie
async function loadNews() {
  try {
    const url = `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_KEY}&languages=es&keywords=gastronomía&limit=3`;
    const res = await fetch(url);
    const data = await res.json();
    const items = data.data || [];

    if (items.length === 0) {
      document.getElementById('news-container').innerHTML = '<li>No hay noticias disponibles.</li>';
      return;
    }

    document.getElementById('news-container').innerHTML = items.map(a => `
      <li class="news-item">
        <a href="${a.url}" target="_blank">${a.title}</a>
        <p>${a.description || ''}</p>
      </li>`).join('');
  } catch (err) {
    console.error('Error al cargar noticias:', err);
    document.getElementById('news-container').innerHTML = `<li>Error cargando noticias.</li>`;
  }
}

// Receta Aleatoria Spoonacular
async function loadDailyRecipe() {
  try {
    const url = `https://api.spoonacular.com/recipes/random?apiKey=${SPOON_KEY}&number=1`;
    const res = await fetch(url);
    const data = await res.json();
    const r = data.recipes?.[0];
    if (!r) throw new Error('No hay receta');

    document.getElementById('daily-recipe').innerHTML = `
      <img src="${r.image}" alt="${r.title}">
      <h4>${r.title}</h4>
      <p>Tiempo: ${r.readyInMinutes} min · Porciones: ${r.servings}</p>
      <a href="${r.sourceUrl}" target="_blank" class="btn">Ver receta completa</a>
    `;
  } catch (err) {
    console.error('Error receta diaria:', err);
    document.getElementById('daily-recipe').innerHTML = `<p>Error cargando receta.</p>`;
  }
}
