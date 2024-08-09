// importing the copy of array with all the countries
import { countriesCopy } from "./countries.js";
// importing the favorietsList key in localstorage
import { favorietsList } from "./domBuilder.js";

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

// making sure the heart symbol is filled or unfilled according to the favorietsList key in localstorage compared to the current viewed country
if (JSON.parse(localStorage.getItem("favorietsList")).includes(JSON.parse(localStorage.getItem("countryName")))) {
    heart.classList.replace("bi-heart", "bi-heart-fill");
} else {
    heart.classList.replace("bi-heart-fill", "bi-heart");
}

// click event on the heart symbol
heart.addEventListener("click", () => {
    if (heart.classList.contains("bi-heart")) {
        heart.classList.replace("bi-heart", "bi-heart-fill");
        // dealing with situation where the user is viewing more info of country from mini-card inside the favoriets page and updating the heart symbol accordingly
        // pushing the country name to the array of favorietsList key in localStorage
        favorietsList.push(name.textContent);
        localStorage.setItem('favorietsList', JSON.stringify(favorietsList));
    } else {
        heart.classList.replace("bi-heart-fill", "bi-heart");
        // remove the country name from array in localStorage when removing like on the card
        let itemIndex = favorietsList.indexOf(name.textContent);
        if (itemIndex !== -1) {
            favorietsList.splice(itemIndex, 1);
            localStorage.setItem("favorietsList", JSON.stringify(favorietsList));
        }
    }
})

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