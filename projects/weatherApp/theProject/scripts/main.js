import fetchWeather from "./fetchName.js";
import createCard from "./card.js";
import createGridData from "./gridData.js";
import changeBodyImage from "./bodyImage.js";
import displayErrorMessage from "./errorHandling.js";

// function to display weather data and handle errors
async function displayWeather(city) {
    try {
        const cityWeather = await fetchWeather(city); // fetch weather data for the searched city
        if (cityWeather) {
            createCard(cityWeather); // update the main weather card with the fetched data
            createGridData(cityWeather); // update the grid with additional weather details
            changeBodyImage(cityWeather); // update the background of the page body
            displayErrorMessage(""); // clear error message if data is successfully fetched
        } else {
            displayErrorMessage("No data available for the selected city."); // show error message if no data is returned
        }
    } catch (error) {
        displayErrorMessage("An error occurred while fetching data."); // show error message on error
        console.error(error); // log the error for debugging
    }
}

// click event for getting the city name and passing it to display the relevant data
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", async () => {
    const userCityName = document.getElementById("search-input").value.trim();
    const cityToFetch = userCityName === "" ? "israel" : userCityName;
    await displayWeather(cityToFetch);
});

// fetch and display weather data for the default city "israel" when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    await displayWeather("israel");
});