function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        firstName: params.get('firstName') || 'Guest',
        lastName: params.get('lastName') || '',
        email: params.get('email') || 'Not provided',
        phone: params.get('phone') || 'Not provided',
        message: params.get('organizationDescription') || 'No message provided'
    };
}

// Mostrar la información del usuario en la página
window.onload = function () {
    const userInfo = getUrlParams();
    const userInfoDiv = document.getElementById('user-info');

    // Personalizar el título
    const thankYouTitle = document.getElementById('thank-you-title');
    thankYouTitle.textContent = `Thank You, ${userInfo.firstName} ${userInfo.lastName}!`;
    // Para hacerlo mas dinamico
    
    // Mostrar los datos del usuario
    userInfoDiv.innerHTML = `
        <p><strong>Email:</strong> ${userInfo.email}</p>
        <p><strong>Phone:</strong> ${userInfo.phone}</p>
        <p><strong>Message:</strong> ${userInfo.message}</p>
    `;
};