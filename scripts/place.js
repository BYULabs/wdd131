// Get the current year and display it in the copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

// Get the last modified date of the document and display it
document.getElementById("lastModified").innerHTML = "Last modification: " + document.lastModified;

// Static weather values (metric: °C and km/h)
const temperature = 22; // °C
const windSpeed = 8; // km/h

// Calculate wind chill factor using metric formula
// Formula: WC = 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// Display wind chill only if conditions are met
// For metric: temperature <= 10°C and wind speed > 4.8 km/h
if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById("windChill").innerHTML = Math.round(windChill * 10) / 10 + " °C";
} else {
    document.getElementById("windChill").innerHTML = "N/A";
}
