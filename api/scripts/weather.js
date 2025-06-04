const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherSpeed = document.querySelector('#wind-speed');
const weatherHumidity = document.querySelector('#humidity');

const lattitude = 49.746360272825044;
const longitude = 6.535130721952441;
const apiKey = 'd70894213c608f0f8713cd1368938f34';

const apiUrl = `//api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${apiKey}&units=imperial&`;


/**
 * Fetches weather data from the OpenWeatherMap API for a specific location.
 * 
 * This function uses latitude and longitude to request weather data, including
 * current temperature and weather conditions. If the response is successful,
 * the data is logged to the console and the results are displayed on the page.
 * If the response is not successful, it throws an error with the response text.
 * 
 * @throws Will log an error message to the console if the fetch operation fails.
 */

async function apiFetch() {
    try {
        const response = await fetch(apiUrl+'lat='+lattitude+'&lon='+longitude+'&appid='+apiKey);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text()); 
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Updates the DOM elements with the weather data fetched from the API.
 *
 * @param {Object} data - The weather data object returned from the API.
 * @param {Object} data.main - Contains temperature information.
 * @param {number} data.main.temp - The current temperature.
 * @param {Array} data.weather - Array containing weather condition objects.
 * @param {Object} data.weather[0] - Primary weather condition.
 * @param {string} data.weather[0].icon - Icon code for the current weather.
 * @param {string} data.weather[0].description - Description of the current weather.
 */

function displayResults(data) {
  currentTemp.innerHTML = `${Math.round(data.main.temp)} &deg;F`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
  weatherSpeed.textContent = `${data.wind.speed} m/s`;
  weatherHumidity.textContent = `${data.main.humidity} %`;
}

apiFetch();