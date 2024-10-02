function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 10 && windSpeed > 4.8) {
        let windChill = 13.12 + 
                        (0.6215 * temperature) - 
                        (11.37 * Math.pow(windSpeed, 0.16)) + 
                        (0.3965 * temperature * Math.pow(windSpeed, 0.16));
        return Math.round(windChill * 100) / 100;
    } 
    return "N/A";
}

function updateWindChill() {
    let temperature = 24; 
    let windSpeed = 14.3; 
    
    let windChillFactor = calculateWindChill(temperature, windSpeed);
    
    let windChillElement = document.getElementById("wind-chill-factor");
    
    windChillElement.textContent = (windChillFactor !== "N/A") ? 
        `${windChillFactor} °C` : 
        windChillFactor;
}

window.addEventListener("load", updateWindChill);
