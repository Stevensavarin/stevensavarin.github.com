(() => {
    // Esta es una IIFE que encapsula todo el código del archivo
    let opinions = [];
    let remainingOpinions = [];

    async function loadOpinions() {
        try {
            console.log('Cargando opiniones...');
            const response = await fetch('./data/opinions.json'); // Carga el archivo JSON
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            opinions = await response.json(); // Convierte la respuesta a JSON
            console.log('Opiniones cargadas:', opinions);
            remainingOpinions = [...opinions]; // Copia las opiniones para manejarlas
            renderRandomOpinions(); // Renderiza las opiniones aleatorias
        } catch (error) {
            console.error('Error loading opinions JSON:', error);
        }
    }

    function getRandomOpinion() {
        if (remainingOpinions.length === 0) {
            remainingOpinions = [...opinions]; // Reinicia la lista si ya se mostraron todas
        }
        const randomIndex = Math.floor(Math.random() * remainingOpinions.length); // Genera un índice aleatorio
        const [selectedOpinion] = remainingOpinions.splice(randomIndex, 1); // Elimina la opinión seleccionada
        return selectedOpinion;
    }

    function renderRandomOpinions() {
        const opinionContainers = document.querySelectorAll('.section-opinion .opinion'); // Encuentra los contenedores de opiniones
        opinionContainers.forEach(container => {
            const opinion = getRandomOpinion(); // Obtiene una opinión aleatoria
            container.innerHTML = `
                <p>"${opinion.quote}"</p>
                <h5>${opinion.author}</h5>
            `;
        });
    }

    // Ejecuta la función cuando la página ha cargado completamente
    window.addEventListener('load', loadOpinions);

    // Cambia las opiniones cada 10 segundos
    setInterval(renderRandomOpinions, 5000);
})();