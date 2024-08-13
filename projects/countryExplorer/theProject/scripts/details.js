// importing the copy of array with all the countries
import { countriesCopy } from "./countries.js";
// importing the favoritesList key in localstorage
import { favoritesList } from "./domBuilder.js";

// getting the country name the user pressed the button to view more details
const countryName = JSON.parse(localStorage.getItem("countryName")) || "";

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

// making sure the heart symbol is filled or unfilled according to the favoritesList key in localstorage compared to the current viewed country
if (favoritesList.includes(countryName)) {
    heart.classList.replace("bi-heart", "bi-heart-fill");
} else {
    heart.classList.replace("bi-heart-fill", "bi-heart");
}

// click event on the heart symbol
heart.addEventListener("click", () => {
    if (heart.classList.contains("bi-heart")) {
        heart.classList.replace("bi-heart", "bi-heart-fill");
        // pushing the country name to the array of favoritesList key in localStorage
        favoritesList.push(name.textContent);
        localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
    } else {
        heart.classList.replace("bi-heart-fill", "bi-heart");
        // remove the country name from array in localStorage when removing like on the card
        let itemIndex = favoritesList.indexOf(name.textContent);
        if (itemIndex !== -1) {
            favoritesList.splice(itemIndex, 1);
            localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
        }
    }
})

// storing all the details of the countryName from API
const viewCountryInfo = countriesCopy.find(country => country.name.common === countryName);

// creating the card with all the information about the chosen country using destructuring
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
    capitals.textContent = capital ? capital.join(", ") : "N/A";
    languages.textContent = countryLanguages ? Object.values(countryLanguages).join(", ") : "N/A";
    region.textContent = countryRegion || "N/A";
    continents.textContent = countryContinents ? countryContinents.join(", ") : "N/A";
    population.textContent = countryPopulation.toLocaleString(); // formatting the number to language-sensitive representation
    independent.textContent = isIndependent ? "Yes" : "No";
    currencies.textContent = countryCurrencies ? Object.values(countryCurrencies).map(currency => currency.name).join(", ") : "N/A";
    unMember.textContent = isUnMember ? "Yes" : "No";
    map.href = googleMaps;
}

// activating function and passing the chosen country name of the card
if (viewCountryInfo) {
    createDetailsCard(viewCountryInfo);
}