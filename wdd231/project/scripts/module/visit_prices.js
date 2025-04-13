(() => {
    // Esta es una IIFE que encapsula todo el código del archivo
    async function loadTours() {
        try {
            console.log('Cargando tours...');
            const response = await fetch('./data/visit.json'); // Carga el archivo JSON
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json(); // Convierte la respuesta a JSON
            console.log('Datos de tours cargados:', data);

            const container = document.getElementById('price-container'); // Encuentra el contenedor
            if (!container) {
                throw new Error('El contenedor #price-container no existe en el DOM.');
            }

            container.innerHTML = ''; // Limpia el contenedor antes de agregar nuevas tarjetas

            data.forEach((item) => {
                const card = document.createElement('div'); // Crea un elemento div para cada tarjeta
                card.className = 'price-box-item'; // Agrega una clase para estilizar las tarjetas
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.alt}" loading="lazy">
                    <h4>${item.title}</h4>
                    <h5>${item.price}</h5>
                    <p>${item.description}</p>
                    <button>Book Now</button>
                `;
                container.appendChild(card); // Agrega la tarjeta al contenedor
            });
        } catch (error) {
            console.error('Error loading tours JSON:', error);
        }
    }

    // Ejecuta la función cuando la página ha cargado completamente
    window.addEventListener('load', loadTours);
})();