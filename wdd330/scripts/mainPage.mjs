import { REPO_BASE_URL } from './config.mjs';
import { initNewsletter } from './newsletter.mjs';


export async function initMainPage() {
  const plansContainer = document.getElementById('plansContainer');
  let plansData = [];

  if (!plansContainer) {
    //console.error("mainPage.mjs: No se encontró el contenedor 'plansContainer'.");
    return;
  }

  try {
    const response = await fetch(`${window.location.origin}${REPO_BASE_URL}public/data/plans.json`);
    if (!response.ok) {
      //console.error(`mainPage.mjs: Error fetching plans.json. URL: ${window.location.origin}${REPO_BASE_URL}public/data/plans.json Status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    plansData = await response.json();
    //console.log("mainPage.mjs: Planes cargados exitosamente:", plansData);
    renderPlans(plansData);
  } catch (error) {
    //console.error("mainPage.mjs: Error al cargar los planes:", error);
    plansContainer.innerHTML = '<p>Error al cargar los planes.</p>';
  }

  function renderPlans(plans) {
    plansContainer.innerHTML = plans.map(plan => `
      <div class="plan-card">
        <h3>${plan.name}</h3>
        <p class="plan-description">${plan.description}</p>
        <p class="plan-price">${plan.price.toFixed(2)} ${plan.currency}<span>/${plan.duration === 'monthly' ? 'mes' : 'año'}</span></p>
        <ul class="plan-features">
          ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <a href="${window.location.origin}${REPO_BASE_URL}#/login" class="btn btn-secondary">Obtener Plan</a>
      </div>
    `).join('');
  }
}

initNewsletter(); 

