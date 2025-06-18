import { getLoggedInUser, isPremiumUser } from './authHelpers.mjs';


export async function router() {
  const routes = {
    '/': 'routes/main.html',
    '/recetas': 'routes/recipes.html',
    '/premium': 'routes/premium.html',
    '/login': 'routes/login.html',
    '/dashboard': 'routes/dashboard.html',
    '/receta': 'routes/receta.html'
  };

  let fullPath = location.hash.slice(1).toLowerCase();
  let path = fullPath.split('?')[0];

  let targetRouteHtml = routes[path];
  if (!targetRouteHtml) {
    targetRouteHtml = 'routes/not-found.html';
  }

  const user = getLoggedInUser();

  if (path === '/premium' && (!user || !isPremiumUser(user))) {
    document.getElementById('app').innerHTML = `
      <section class="denied">
        <h2>Acceso denegado</h2>
        <p>Esta sección es solo para usuarios premium.</p>
        <a href="/#/dashboard" class="btn">Actualizar plan</a> </section>`;
    return;
  }

  try {
    const html = await fetch(`/${targetRouteHtml}`).then(res => res.text());
    document.getElementById('app').innerHTML = html;

    if (path === '/login') {
      import('./login.mjs').then(m => m.initLogin?.());
    } else if (path === '/dashboard') {
      import('./dashboard.mjs').then(m => m.initDashboard?.());
    } else if (path === '/recetas') {
      import('./recipes.mjs').then(m => m.loadRecipes?.());
    } else if (path === '/premium') {
      import('./premium.mjs').then(m => m.initPremium?.());
    } else if (path === '/receta') {
      import('./recetaDetalle.mjs').then(m => {
        if (m.loadRecipeDetail) {
          m.loadRecipeDetail();
        } else {
          console.error("Error: loadRecipeDetail no está exportada en recetaDetalle.mjs o no es una función.");
        }
      }).catch(err => {
        console.error("Error al importar recetaDetalle.mjs:", err);
      });
    }
  } catch (err) {
    console.error("Error al cargar la página:", err);
    document.getElementById('app').innerHTML = '<h2>Error al cargar la página.</h2>';
  }
}

