async function loadCards() {
    try {
        // Cargar el archivo JSON
        const response = await fetch('./data/index.json'); // Asegúrate de que la ruta sea correcta
        const data = await response.json();

        const container = document.getElementById('cards-container');

        // Función para seleccionar elementos aleatorios sin repetición
        function getRandomCards(data, count) {
            const shuffled = [...data].sort(() => Math.random() - 0.5); // Mezcla el array
            return shuffled.slice(0, count); // Retorna los primeros 'count' elementos
        }

        // Función para renderizar las tarjetas
        function renderCards(cards) {
            container.innerHTML = ''; // Limpiar el contenedor

            cards.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = `card_${index + 1} box-card`; // Mantener las clases originales

                card.innerHTML = `
                    <img src="${item.image}" alt="${item.alt}" width="520" height="767" loading="lazy">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                `;

                // Agregar un efecto de transición
                card.style.opacity = 0;
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'scale(1)';
                }, 100);

                container.appendChild(card);
            });
        }

        // Función para actualizar las tarjetas automáticamente
        function updateCards() {
            const randomCards = getRandomCards(data, 3); // Obtener 3 tarjetas aleatorias
            renderCards(randomCards); // Renderizar las tarjetas seleccionadas
        }

        // Renderizar las primeras tarjetas
        updateCards();

        // Actualizar las tarjetas cada 6 segundos
        setInterval(updateCards, 6000);
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Llamar a la función al cargar la página
window.onload = loadCards;