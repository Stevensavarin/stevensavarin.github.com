import { getLoggedInUser, isPremiumUser } from './authHelpers.mjs';
import { REPO_BASE_URL } from './config.mjs';

export async function router() {
  console.log("router.mjs: router() iniciado.");
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
  console.log(`router.mjs: Hash completo: ${fullPath}, Ruta base: ${path}`);

  let targetRouteHtml = routes[path];
  if (!targetRouteHtml) {
    targetRouteHtml = 'routes/not-found.html';
    console.log(`router.mjs: Ruta '${path}' no definida. Cargando not-found.html.`);
  }

  const user = getLoggedInUser();
  console.log("router.mjs: Usuario logueado:", user);

  if (path === '/premium' && (!user || !isPremiumUser(user))) {
    console.log("router.mjs: Acceso denegado a Premium. Redirigiendo a dashboard.");
    document.getElementById('app').innerHTML = `
      <section class="denied">
        <h2>Acceso denegado</h2>
        <p>Esta sección es solo para usuarios premium.</p>
        <a href="${REPO_BASE_URL}#/dashboard" class="btn">Actualizar plan</a>
      </section>`;
    return;
  }

  try {
    console.log(`router.mjs: Fetching HTML: ${REPO_BASE_URL}${targetRouteHtml}`);
    const html = await fetch(`${REPO_BASE_URL}${targetRouteHtml}`).then(res => {
      if (!res.ok) {
        console.error(`router.mjs: Error fetching HTML. Status: ${res.status}`);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text();
    });
    document.getElementById('app').innerHTML = html;
    console.log(`router.mjs: HTML cargado para ruta: ${path}`);

    if (path === '/login') {
      console.log("router.mjs: Importando login.mjs");
      import('./login.mjs').then(m => m.initLogin?.());
    } else if (path === '/dashboard') {
      console.log("router.mjs: Importando dashboard.mjs");
      import('./dashboard.mjs').then(m => m.initDashboard?.());
    } else if (path === '/recetas') {
      console.log("router.mjs: Importando recipes.mjs");
      import('./recipes.mjs').then(m => m.loadRecipes?.());
    } else if (path === '/premium') {
      console.log("router.mjs: Importando premium.mjs");
      import('./premium.mjs').then(m => m.initPremium?.());
    } else if (path === '/receta') {
      console.log("router.mjs: Importando recetaDetalle.mjs");
      import('./recetaDetalle.mjs').then(m => {
        if (m.loadRecipeDetail) {
          console.log("router.mjs: Llamando a m.loadRecipeDetail()");
          m.loadRecipeDetail();
        } else {
          console.error("router.mjs: Error: loadRecipeDetail no está exportada en recetaDetalle.mjs o no es una función.");
        }
      }).catch(err => {
        console.error("router.mjs: Error al importar recetaDetalle.mjs:", err);
      });
    }
  } catch (err) {
    console.error("router.mjs: Error al cargar la página:", err);
    document.getElementById('app').innerHTML = '<h2>Error al cargar la página.</h2>';
  }
  console.log("router.mjs: router() finalizado.");
}

