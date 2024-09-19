const API_KEY = 'd5052429035c7fb17ea90cd415fe8992';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const weatherCard = document.getElementById('weather-card');
const otherLocationsContainer = document.getElementById('other-locations');

const otherLocations = ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'];

function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getBackgroundImage(weatherCondition) {
    const images = {
        Clear: '/images/clearsky.jpg',
        Clouds: '/images/cloudysky.jpg',
        Rain: '/images/rainy.jpg',
        Snow: '/images/snowy.jpg',
    };
    return images[weatherCondition] || images.Clear;
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        updateWeatherUI(data);
        updateBackgroundImage(data.weather[0].main);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherUI(data) {
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('location').querySelector('span').textContent = data.name;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('date-time').textContent = new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    document.getElementById('weather-icon').src = getWeatherIcon(data.weather[0].icon);
    document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} km/h`;
    document.getElementById('weather-main').textContent = data.weather[0].main;
    weatherCard.classList.remove('hidden');
}

function updateBackgroundImage(weatherCondition) {
    const backgroundImage = getBackgroundImage(weatherCondition);
    document.getElementById('app').style.backgroundImage = `url(${backgroundImage})`;
}

function createOtherLocationsList() {
    otherLocations.forEach(location => {
        const li = document.createElement('li');
        li.className = 'cursor-pointer hover:bg-white/20 p-2 rounded transition-colors duration-200 flex items-center';
        li.innerHTML = `
            <i data-lucide="map-pin" class="mr-2"></i>
            ${location}
        `;
        li.addEventListener('click', () => fetchWeather(location));
        otherLocationsContainer.appendChild(li);
    });
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value) {
        fetchWeather(searchInput.value);
    }
});

// Initialize the app
createOtherLocationsList();
fetchWeather('Bhubaneswar');

// Initialize Lucide icons
lucide.createIcons();