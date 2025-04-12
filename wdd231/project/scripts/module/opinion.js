let opinions = [];
    let remainingOpinions = [];

    async function loadOpinions() {
        try {
            // Cargar el archivo JSON
            const response = await fetch('./data/opinions.json'); // Asegúrate de que la ruta sea correcta
            opinions = await response.json();
            remainingOpinions = [...opinions]; // Copiar las opiniones para manejarlas
            renderRandomOpinions();
        } catch (error) {
            console.error('Error loading JSON data:', error);
        }
    }

    function getRandomOpinion() {
        if (remainingOpinions.length === 0) {
            remainingOpinions = [...opinions]; // Reiniciar la lista si ya se mostraron todas
        }
        const randomIndex = Math.floor(Math.random() * remainingOpinions.length);
        const [selectedOpinion] = remainingOpinions.splice(randomIndex, 1); // Eliminar la opinión seleccionada
        return selectedOpinion;
    }

    function renderRandomOpinions() {
        const opinionContainers = document.querySelectorAll('.section-opinion .opinion');
        opinionContainers.forEach(container => {
            const opinion = getRandomOpinion();
            container.innerHTML = `
                <p>"${opinion.quote}"</p>
                <h5>${opinion.author}</h5>
            `;
        });
    }

    // Llamar a la función al cargar la página
    window.onload = loadOpinions;

    // Opcional: Cambiar las opiniones cada cierto tiempo (por ejemplo, cada 10 segundos)
    setInterval(renderRandomOpinions, 5000);