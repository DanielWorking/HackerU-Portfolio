// function for changing the page background image based on city current time
export default function changeBodyImage(cityWeather) {
    // convert sunrise and sunset times to milliseconds
    const sunriseTime = cityWeather.sys.sunrise * 1000;
    const sunsetTime = cityWeather.sys.sunset * 1000;

    // get the current UTC time
    const currentTimeUTC = Date.now();

    // calculate the current time in the city by adding the city's timezone in seconds
    const currentTimeInCity = currentTimeUTC + (cityWeather.timezone * 1000);

    // determine if it's day or night time in the city
    const isDayTime = (sunriseTime <= currentTimeInCity) && (currentTimeInCity < sunsetTime);

    // update the background image based on the time
    document.body.style.backgroundImage = isDayTime ? "url('./images/day-time.jpg')" : "url('./images/night-time.jpg')";
}