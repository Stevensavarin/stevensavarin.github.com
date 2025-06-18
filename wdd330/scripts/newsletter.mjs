export function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmailInput = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    if (newsletterForm && newsletterEmailInput && newsletterMessage) {
        newsletterForm.addEventListener('submit', handleBasicNewsletterSubmit);
        //console.log("newsletter.mjs: Formulario de newsletter básico inicializado.");
    } else {
        //console.error("newsletter.mjs: No se encontraron todos los elementos del formulario de newsletter (form, input, message).");
    }
}

function showBasicNewsletterMessage(message, type) {
    const newsletterMessage = document.getElementById('newsletterMessage');
    if (newsletterMessage) {
        newsletterMessage.className = 'newsletter-message';
        newsletterMessage.classList.add(type);
        newsletterMessage.textContent = message;
        
        //console.log(`newsletter.mjs: Mensaje mostrado - Tipo: ${type}, Texto: ${message}`);

        setTimeout(() => {
            newsletterMessage.textContent = '';
            newsletterMessage.className = 'newsletter-message';
            //console.log("newsletter.mjs: Mensaje ocultado.");
        }, 5000);
    }
}

function handleBasicNewsletterSubmit(event) {
    event.preventDefault();

    const newsletterEmailInput = document.getElementById('newsletterEmail');
    if (!newsletterEmailInput) {
        //console.error("newsletter.mjs: Elemento de input de email no encontrado en handleBasicNewsletterSubmit.");
        showBasicNewsletterMessage('Ocurrió un error al procesar tu solicitud.', 'error');
        return;
    }

    const email = newsletterEmailInput.value.trim();

    if (!email) {
        showBasicNewsletterMessage('Por favor, introduce tu email.', 'info'); // Cambiado a 'info' para vacío
        return;
    }

    try {
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];

        if (subscribers.includes(email)) {
            showBasicNewsletterMessage('¡Ya estás suscrito con este email!', 'info'); // 'info' para ya suscrito
        } else {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            showBasicNewsletterMessage('¡Suscripción exitosa! Revisa tu bandeja de entrada.', 'success');
            newsletterEmailInput.value = '';
        }
    } catch (error) {
        //console.error("newsletter.mjs: Error al guardar suscriptor:", error);
        showBasicNewsletterMessage('Ocurrió un error al suscribirte. Inténtalo de nuevo.', 'error');
    }
}