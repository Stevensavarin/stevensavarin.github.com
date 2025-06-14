import { updateNavbarAuthState } from './authHelpers.mjs';

export function initLogin() {
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('loginError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('public/data/users.json');
      const users = await response.json();

      const user = users.find(u => u.email === email && u.passwordHash === password);

      if (!user) {
        errorMsg.textContent = 'Correo o contraseña incorrectos.';
        return;
      }

      if (!user.isActive) {
        errorMsg.textContent = 'Tu cuenta está inactiva.';
        return;
      }

      // Autenticación exitosa
      const { passwordHash, ...safeUser } = user;
      localStorage.setItem('user', JSON.stringify(safeUser));

      updateNavbarAuthState(); // ← esto actualiza el navbar inmediatamente

      window.location.hash = '#/dashboard';

    } catch (err) {
      console.error('Error durante el login:', err);
      errorMsg.textContent = 'Error al iniciar sesión. Intenta de nuevo.';
    }
  });
}

