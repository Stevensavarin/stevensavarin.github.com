export async function router() {
  const routes = {
    '/': 'routes/main.html',
    '/recetas': 'routes/recipes.html',
    '/premium': 'routes/premium.html',
    '/login': 'routes/login.html',
    '/register': 'routes/register.html',
    '/dashboard': 'routes/dashboard.html'
  };

  const path = location.hash.slice(1).toLowerCase();

  // Si 'path' está vacío (es decir, estoy en la raíz o solo '#'),
  // quiero tratarlo como si fuera la ruta raíz '/'.
  // NO RETORNAR AQUÍ.
  if (!path) {
    path = '/'; // le asigno '/' como el path por defecto si no hay hash.
  }

  const route = routes[path] || 'routes/not-found.html';

  try {
    const html = await fetch(route).then(res => res.text());
    document.getElementById('app').innerHTML = html;

    // ¡CAMBIO CLAVE AQUÍ!
    // Ahora, después de que el HTML se ha cargado en el DOM,
    // podemos ejecutar el JavaScript específico de la ruta.
    if (path === '/recetas') {
      // de recipes.mjs exporto la función loadRecipes()
      // que se encargará de inicializar la funcionalidad de la página de recetas.
      import('./recipes.mjs').then(m => m.loadRecipes());
    }

  } catch (err) {
    console.error('Error cargando la ruta:', err);
    document.getElementById('app').innerHTML = '<h2>Error al cargar la página.</h2>';
  }
}

// Week 05
