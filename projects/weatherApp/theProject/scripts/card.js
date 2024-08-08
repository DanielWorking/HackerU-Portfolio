// creating variables of the card
const icon = document.getElementById("main-icon");
const description = document.getElementById("main-description");
const temperature = document.getElementById("temperature");
const city = document.getElementById("city-name");

// inserting api data to the corresponding card elements
export default function createCard(cityWeather) {
    icon.src = `./images/${cityWeather.weather[0].icon}.png`;
    description.textContent = cityWeather.weather[0].main;
    temperature.textContent = cityWeather.main.temp + "°C";
    city.textContent = cityWeather.name;
}