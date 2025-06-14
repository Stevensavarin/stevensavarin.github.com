import { router } from './router.mjs';
import { updateNavbarAuthState, logoutUser } from './authHelpers.mjs';

async function init() {
  await router();
  updateNavbarAuthState();

  const logoutLink = document.getElementById('nav-logout');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser(); // usás el nombre correcto aquí
    });
  }
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', init);
