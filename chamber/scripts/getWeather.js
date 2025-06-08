// DOM Elements
const currentTemp = document.querySelector('#current-temp');
const description = document.querySelector('#description');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const weatherIconContainer = document.querySelector('.weather-icon');
const todayElement = document.querySelector("#today span");
const tomorrowElement = document.querySelector("#tomorrow span");
const dayAfterElement = document.querySelector("#day-after span");

// Configuration
const config = {
  latitude: 19.221132977054005,
  longitude: -70.52887909549578,
  apiKey: 'd70894213c608f0f8713cd1368938f34',
  units: 'imperial'
};

// API URLs
const apiUrls = {
  current: `https://api.openweathermap.org/data/2.5/weather?lat=${config.latitude}&lon=${config.longitude}&appid=${config.apiKey}&units=${config.units}`,
  forecast: `https://api.openweathermap.org/data/2.5/forecast?lat=${config.latitude}&lon=${config.longitude}&appid=${config.apiKey}&units=${config.units}`
};

// Utility functions
const utils = {
  
    /**
     * Formats a given Date object into a string representing the weekday.
     *
     * @param {Date} date - The Date object to format.
     * @returns {string} The formatted weekday string in English.
     */
    formatDate: (date) => {
        const options = { weekday: "long" };
        return date.toLocaleDateString("en-US", options);
    },
  
    /**
     * Formats a given Unix timestamp into a string representing the time.
     *
     * @param {number} unixTimestamp - The Unix timestamp to format.
     * @returns {string} The formatted time string in English.
     */
    formatTime: (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        let timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
        });
        return timeString;
    },
  
    /**
     * Given a forecast data object, returns the weather forecast object for the
     * specified number of days from today, or undefined if no forecast is found.
     *
     * @param {Object} forecastData - The forecast data object from the API, containing
     *   a list of forecast objects.
     * @param {number} daysFromToday - The number of days from today to get the forecast
     *   for.
     * @returns {Object} The forecast object for the specified day, or undefined.
     */
    getDayForecast: (forecastData, daysFromToday) => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysFromToday);
        targetDate.setHours(12, 0, 0, 0); // Pronóstico para el mediodía
        
        return forecastData.list.find(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate.getDate() === targetDate.getDate() && 
                itemDate.getMonth() === targetDate.getMonth();
        });
    }
};

    /**
     * Fetches the current weather and forecast data from the OpenWeatherMap API, then
     * calls the `displayCurrentWeather` and `displayForecast` functions to display the
     * fetched data.
     *
     * @throws Will log an error message to the console if the fetch operation fails.
     */
    async function fetchWeatherData() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
        fetch(apiUrls.current),
        fetch(apiUrls.forecast)
        ]);
        
        if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Error fetching weather data');
        }
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
    } catch (error) {
        console.error('Error:', error);
    }
    }

    /**
     * Displays the current weather information.
     *
     * @param {Object} data - The current weather data object from the API, containing
     *   the current temperature, humidity, high and low temperatures, sunrise and
     *   sunset times, weather description and icon.
     */
    function displayCurrentWeather(data) {
    currentTemp.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;
    highTemp.textContent = Math.round(data.main.temp_max);
    lowTemp.textContent = Math.round(data.main.temp_min);
    humidity.textContent = data.main.humidity;
    
    sunrise.textContent = utils.formatTime(data.sys.sunrise).slice(0, -3);
    sunset.textContent = utils.formatTime(data.sys.sunset).slice(0, -3);
    
    const weatherIcon = document.createElement('img');
    weatherIcon.id = "weather-icon";
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = "Weather Icon";
    
    weatherIconContainer.appendChild(weatherIcon);
    }

    /**
     * Displays the forecasted temperatures for today, tomorrow, and the day after tomorrow.
     *
     * @param {Object} data - The forecast data object from the API, containing a list of
     *   forecasted weather data objects.
     */
    function displayForecast(data) {
    const today = new Date();
    
    todayElement.textContent = `Today: ${Math.round(data.list[0].main.temp)}°F`;
    
    const tomorrowForecast = utils.getDayForecast(data, 1);
    if (tomorrowForecast) {
        tomorrowElement.textContent = `${utils.formatDate(new Date(tomorrowForecast.dt * 1000))}: ${Math.round(tomorrowForecast.main.temp)}°F`;
    }
    
    const dayAfterForecast = utils.getDayForecast(data, 2);
    if (dayAfterForecast) {
        dayAfterElement.textContent = `${utils.formatDate(new Date(dayAfterForecast.dt * 1000))}: ${Math.round(dayAfterForecast.main.temp)}°F`;
    }
}

// Inicialize the weather data
fetchWeatherData();