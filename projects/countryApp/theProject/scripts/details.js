// importing the copy of array with all the countries
import { countriesCopy } from "./countries.js";

// getting the country name the user presed the button to view more details
const countryName = JSON.parse(localStorage.getItem("countryName"));

// creating variables connected to the html elements of the country details
const flag = document.querySelector(".country-flag");
const name = document.querySelector(".name");
const capitals = document.querySelector(".capitals");
const languages = document.querySelector(".languages");
const region = document.querySelector(".region");
const continents = document.querySelector(".continents");
const population = document.querySelector(".population");
const independent = document.querySelector(".independent");
const currencies = document.querySelector(".currencies");
const unMember = document.querySelector(".un-member");
const map = document.querySelector(".map-link");

const heart = document.querySelector("i");

// click event on the heart symbol
heart.addEventListener("click", () => {
    if (heart.className === "bi bi-heart") {
        heart.className = "bi bi-heart-fill";
    } else {
        heart.className = "bi bi-heart";
    }
});

// storing all the details of the countryName from API
const viewCountryInfo = countriesCopy.find(country => country.name.common === countryName);

// creting the card with all the information about the chosen country using destracturing
function createDetailsCard(country) {
    const {
        flags,
        name: { common: countryName },
        capital,
        languages: countryLanguages,
        region: countryRegion,
        continents: countryContinents,
        population: countryPopulation,
        independent: isIndependent,
        currencies: countryCurrencies,
        unMember: isUnMember,
        maps: { googleMaps }
    } = country;

    // inserting the data to the html elements
    flag.src = flags.svg;
    name.textContent = countryName;
    capitals.textContent = capital.join(", ");
    languages.textContent = Object.values(countryLanguages).join(", ");
    region.textContent = countryRegion;
    continents.textContent = countryContinents.join(", ");
    population.textContent = countryPopulation.toLocaleString(); // formating the number to language-sensitive representation
    independent.textContent = isIndependent ? "Yes" : "No";
    currencies.textContent = Object.values(countryCurrencies).map(currency => currency.name).join(", ");
    unMember.textContent = isUnMember ? "Yes" : "No";
    map.href = googleMaps;
}

// activating function and passing the chosen country name of the card
createDetailsCard(viewCountryInfo);

// checking if the country has already been added to favoriets
if (JSON.parse(localStorage.getItem("favorietsList")).includes(name.textContent)) {
    heart.className = "bi bi-heart-fill";
} else {
    heart.className = "bi bi-heart";
}