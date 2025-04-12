async function loadTours() {
    try {
        // Cargar el archivo JSON
        const response = await fetch('./data/visit.json'); // Asegúrate de que la ruta sea correcta
        const data = await response.json();

        const container = document.getElementById('price-container');

        // Limpiar el contenedor antes de agregar nuevas tarjetas
        container.innerHTML = '';

        // Generar las tarjetas dinámicamente
        data.forEach((item) => {
            const card = document.createElement('div');
            card.innerHTML = `
                <img src="${item.image}" alt="${item.alt}" width="540" height="960" loading="lazy">
                <h4>${item.title}</h4>
                <h5>${item.price}</h5>
                <p>${item.description}</p>
                <button>Book Now</button>
            `;

            // Agregar la tarjeta al contenedor
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Llamar a la función al cargar la página
window.onload = loadTours;