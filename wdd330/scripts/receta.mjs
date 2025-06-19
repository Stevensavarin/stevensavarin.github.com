/*export function initRecetas() {
  const recetaCards = document.querySelectorAll('.receta-card');

  // Obtener el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userIsPremium = user && (user.isPremium || (user.roles && user.roles.includes('premium')));

  recetaCards.forEach(card => {
    card.addEventListener('click', () => {
      const recetaId = card.dataset.id;
      const isPremium = card.dataset.premium === 'true';

      if (isPremium && !userIsPremium) {
        mostrarModalUpgrade();
        return;
      }

      // ✅ Usar hash routing
      window.location.href = `/#/receta?id=${recetaId}`;
    });
  });
}

function mostrarModalUpgrade() {
  const modal = document.createElement('div');
  modal.classList.add('modal-upgrade');
  modal.innerHTML = `
    <div class="modal-content">
      <h2>🔑 Acceso Premium</h2>
      <p>Esta receta es exclusiva para usuarios Premium. Mejora tu plan para acceder al contenido completo.</p>
      <button id="cerrarModal">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('cerrarModal').addEventListener('click', () => {
    modal.remove();
  });
}
*/

