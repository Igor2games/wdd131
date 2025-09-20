// weather.js

// 1) Static values matching your HTML
const temperatureC = 26;    // in °C
const windSpeedKmh = 15;    // in km/h

/**
 * 2) calculateWindChill
 *    Uses the metric wind-chill formula:
 *      WCT = 13.12 + 0.6215·T − 11.37·V^0.16 + 0.3965·T·V^0.16
 *    T in °C, V in km/h.
 *    Returns the computed wind-chill in °C.
 */
function calculateWindChill(T, V) {
    return 13.12
        + 0.6215 * T
        - 11.37 * Math.pow(V, 0.16)
        + 0.3965 * T * Math.pow(V, 0.16);
}

// 3) On page load, decide whether to compute or show "N/A"
window.addEventListener('load', () => {
    const windChillEl = document.getElementById('windChill');

    // only valid when T ≤ 10°C and V > 4.8 km/h
    if (temperatureC <= 10 && windSpeedKmh > 4.8) {
        const chill = calculateWindChill(temperatureC, windSpeedKmh);
        // round to one decimal place and append unit
        windChillEl.textContent = chill.toFixed(1) + '°C';
    } else {
        windChillEl.textContent = 'N/A';
    }
});
