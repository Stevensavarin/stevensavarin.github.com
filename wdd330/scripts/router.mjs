import { getLoggedInUser } from './authHelpers.mjs';

export async function router() {
  const routes = {
    '/': 'routes/main.html',
    '/recetas': 'routes/recipes.html',
    '/premium': 'routes/premium.html',
    '/login': 'routes/login.html',
    '/dashboard': 'routes/dashboard.html'
  };

  let path = location.hash.slice(1).toLowerCase() || '/';
  const route = routes[path] || 'routes/not-found.html';

  const user = getLoggedInUser();

  // Redirigir si el usuario intenta ir a /premium y no es premium
  if (path === '/premium' && (!user || !user.roles.includes('premium'))) {
    document.getElementById('app').innerHTML = `
      <section class="denied">
        <h2>Acceso denegado</h2>
        <p>Debes tener una suscripción premium para acceder a esta sección.</p>
        <a href="#/login" class="btn">Actualizar plan</a>
      </section>`;
    return;
  }

  try {
    const html = await fetch(route).then(res => res.text());
    document.getElementById('app').innerHTML = html;

    // Cargar scripts específicos por página
    if (path === '/login') import('./login.mjs').then(m => m.initLogin());
    if (path === '/dashboard') import('./dashboard.mjs').then(m => m.initDashboard?.());
    if (path === '/recetas') import('./recipes.mjs').then(m => m.loadRecipes?.());
    if (path === '/premium') import('./premium.mjs').then(m => m.initPremium?.());
  } catch (err) {
    console.error('Error cargando la ruta:', err);
    document.getElementById('app').innerHTML = '<h2>Error al cargar la página.</h2>';
  }
}

// Week 05
