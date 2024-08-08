// creating variables of the card
const feelsLike = document.getElementById("feels-like");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const clouds = document.getElementById("clouds");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
const sunsrise = document.getElementById("sunsrise");
const sunset = document.getElementById("sunset");

// inserting api data to the corresponding card elements
export default function createGridData(cityWeather) {
    feelsLike.textContent = `${cityWeather.main.feels_like}°C`;
    windSpeed.textContent = `${cityWeather.wind.speed} m/s`;
    humidity.textContent = `${cityWeather.main.humidity}%`;
    clouds.textContent = `${cityWeather.clouds.all}%`;
    visibility.textContent = `${cityWeather.visibility / 1000} km`;
    pressure.textContent = `${cityWeather.main.pressure} hPa`;

    // making sure the sunsest and sunrise times are readable
    const sunriseUnixTime = cityWeather.sys.sunrise;
    const readableSunriseTime = new Date(sunriseUnixTime * 1000).toLocaleTimeString();
    sunsrise.textContent = readableSunriseTime;

    const sunsetUnixTime = cityWeather.sys.sunset;
    const readableSunsetTime = new Date(sunsetUnixTime * 1000).toLocaleTimeString();    
    sunset.textContent = readableSunsetTime;
}