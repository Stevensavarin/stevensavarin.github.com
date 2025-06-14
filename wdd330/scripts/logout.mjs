export function logoutUser() {
  const user = JSON.parse(localStorage.getItem('authUser'));
  if (user) {
    user.isLoggedIn = false;
    localStorage.setItem('authUser', JSON.stringify(user));
  }

  // Redirigir al inicio y refrescar nav
  window.location.hash = '#/';
  updateNavbarAuthState();
}