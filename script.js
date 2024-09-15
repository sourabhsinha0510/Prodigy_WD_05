// script.js
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'bacdff4fda087b82b18dbd6bc82ae9a2'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = 'Error retrieving weather data.';
    }
}

function displayWeather(data) {
    if (data.cod === '404') {
        document.getElementById('weatherResult').innerHTML = 'City not found.';
        return;
    }

    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const city = data.name;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const country = data.sys.country;
    const visibility = data.visibility;
    const sunrise =data.sys.sunrise;
    const sunset = data.sys.sunset;
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('en-IN', { hour12: true, minute12: true });
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('en-IN', { hour12: true, minute12: true });

    document.getElementById('weatherResult').innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
        <p>Temperature: ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
        <p><strong>Visibility:</strong> ${visibility} m</p>
        <p><strong>Sunrise:</strong>${sunriseTime}</p>
        <p><strong>Sunrise:</strong>${sunsetTime}</p>
    `;
}
