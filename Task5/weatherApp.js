const apiKey = 'bcccb9e1b84c8dee0d7b2d3b8e83999e';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        });
    }
});

function getWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeatherData(url);
}

function getWeatherByCity() {
    const city = document.getElementById('location-input').value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        document.getElementById('weather-info').innerHTML = '<p>Loading...</p>';
        fetchWeatherData(url);
    }
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data.</p>';
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherInfo = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } else {
        document.getElementById('weather-info').innerHTML = '<p>City not found.</p>';
    }
}
