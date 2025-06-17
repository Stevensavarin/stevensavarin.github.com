export function setupHamburgerMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('header nav ul');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const isOpen = navMenu.classList.contains('show');
      toggleBtn.innerHTML = isOpen ? '&times;' : '&#9776;'; // X o ☰
    });

    // Cierra el menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        toggleBtn.innerHTML = '&#9776;';
      });
    });
  }
}
