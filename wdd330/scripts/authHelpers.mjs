export function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user || null;
}

export function logoutUser() {
  localStorage.removeItem('user');
  location.hash = '#/';
  updateNavbarAuthState();
}

export function updateNavbarAuthState() {
  const user = getLoggedInUser();
  const loginLink = document.getElementById('nav-login');
  const logoutLink = document.getElementById('nav-logout');
  const dashboardLink = document.getElementById('nav-dashboard');

  if (user) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline-block';
    dashboardLink.style.display = 'inline-block';
  } else {
    loginLink.style.display = 'inline-block';
    logoutLink.style.display = 'none';
    dashboardLink.style.display = 'none';
  }
}
