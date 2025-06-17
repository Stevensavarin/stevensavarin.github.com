import { router } from './router.mjs';
import { updateNavbarAuthState, logoutUser } from './authHelpers.mjs';
import { setupHamburgerMenu } from './utils.mjs';

async function init() {
  await router();
  updateNavbarAuthState();

  const logoutLink = document.getElementById('nav-logout');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu(); // Se asegura de enlazar el botón siempre
  init();
});

window.addEventListener('hashchange', init);
