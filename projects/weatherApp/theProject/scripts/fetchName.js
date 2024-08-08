// the API key for making the API request
const apiKey = "910691bd37eb10a0280b492a2cba21f4";

// creating a fetch function for getting all the data related to the searched city
async function fetchWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        // error handling in case fetch request didn't work
        if (!response.ok) {
            throw new Error("Country not found or API request failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        displayErrorMessage("Error fetching weather data. Please try again.");
        return null;
    }
}
export default fetchWeather;