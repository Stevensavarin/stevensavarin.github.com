export async function initPremium() {
  const calculateBtn = document.getElementById('calculateBtn');
  const resultDiv = document.getElementById('resultado-calorias');
  const consejoDiv = document.getElementById('consejo-ai');
  const pesoInput = document.getElementById('peso');
  const alturaInput = document.getElementById('altura');
  const comidaInput = document.getElementById('comida');

  if (!calculateBtn) return;

  // Mostrar último IMC si hay datos
  mostrarUltimoResultado();

  calculateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    resultDiv.innerHTML = '';
    consejoDiv.innerHTML = '';

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    const comida = comidaInput.value;

    if (!peso || !altura || !comida) {
      resultDiv.innerHTML = '<p class="error">Completa todos los campos antes de calcular.</p>';
      return;
    }

    const imc = peso / ((altura / 100) ** 2);
    let consejo = '';
    let rutina = '';

    if (imc < 18.5) {
      consejo = 'Tienes bajo peso. Es recomendable aumentar tu ingesta calórica.';
      rutina = 'Enfócate en ejercicios de fuerza y resistencia, como pesas y entrenamiento funcional.';
    } else if (imc >= 18.5 && imc <= 24.9) {
      consejo = 'Tu peso está en un rango saludable. ¡Sigue así!';
      rutina = 'Mantén una rutina balanceada de cardio y fuerza.';
    } else if (imc >= 25 && imc <= 29.9) {
      consejo = 'Estás en sobrepeso. Considera ajustar tu dieta y hacer más ejercicio.';
      rutina = 'Realiza ejercicios cardiovasculares como correr, nadar o andar en bici.';
    } else {
      consejo = 'Obesidad detectada. Consulta con un especialista para un plan personalizado.';
      rutina = 'Haz caminatas, natación suave o bicicleta, e incrementa intensidad gradualmente.';
    }

    guardarIMC(imc, consejo, rutina);

    resultDiv.innerHTML = `
      <h3>Resultado</h3>
      <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
      <p><strong>Consejo:</strong> ${consejo}</p>
    `;

    consejoDiv.innerHTML = `
      <h3>🏋️ Rutina sugerida</h3>
      <p>${rutina}</p>
    `;

    await mostrarGraficoIMC();

    // Limpiar inputs
    pesoInput.value = '';
    alturaInput.value = '';
    comidaInput.value = '';
  });
}

function guardarIMC(imc, consejo, rutina) {
  const historial = JSON.parse(localStorage.getItem('imcHistorial')) || [];
  const nuevaEntrada = {
    fecha: new Date().toISOString().split('T')[0],
    imc: parseFloat(imc.toFixed(2)),
    consejo,
    rutina
  };

  historial.push(nuevaEntrada);
  localStorage.setItem('imcHistorial', JSON.stringify(historial));
}

function mostrarUltimoResultado() {
  const resultDiv = document.getElementById('resultado-calorias');
  const consejoDiv = document.getElementById('consejo-ai');

  const historial = JSON.parse(localStorage.getItem('imcHistorial')) || [];

  if (historial.length === 0) {
    resultDiv.innerHTML = `<p>No hay datos previos. Completa el formulario para calcular tu IMC.</p>`;
    consejoDiv.innerHTML = '';
    return;
  }

  const ultimo = historial[historial.length - 1];

  resultDiv.innerHTML = `
    <h3>Último Resultado</h3>
    <p><strong>Fecha:</strong> ${ultimo.fecha}</p>
    <p><strong>IMC:</strong> ${ultimo.imc}</p>
    <p><strong>Consejo:</strong> ${ultimo.consejo}</p>
  `;

  consejoDiv.innerHTML = `
    <h3>🏋️ Última Rutina</h3>
    <p>${ultimo.rutina}</p>
  `;

  mostrarGraficoIMC();
}

async function loadChartJsIfNeeded() {
  if (typeof Chart === 'undefined') {
    await import('https://cdn.jsdelivr.net/npm/chart.js');
  }
}

async function mostrarGraficoIMC() {
  await loadChartJsIfNeeded();

  const imcHistorial = JSON.parse(localStorage.getItem('imcHistorial')) || [];
  if (imcHistorial.length === 0) return;

  const fechas = imcHistorial.map(entry => entry.fecha);
  const imcs = imcHistorial.map(entry => entry.imc);

  const canvas = document.getElementById('graficoIMC');
  const ctx = canvas.getContext('2d');

  if (window.miGraficoIMC) {
    window.miGraficoIMC.destroy();
  }

  window.miGraficoIMC = new Chart(ctx, {
    type: 'line',
    data: {
      labels: fechas,
      datasets: [{
        label: 'IMC',
        data: imcs,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255,107,107,0.1)',
        tension: 0.2,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          suggestedMin: 15,
          suggestedMax: 35
        }
      }
    }
  });
}

