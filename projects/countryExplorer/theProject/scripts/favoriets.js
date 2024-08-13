// importing the function for creating the mini-cards
import { createCard, favoritesList } from "./domBuilder.js";
// importing the copy of the API data
import { countriesCopy } from "./countries.js";

// creating mini-cards only for countries the user clicked the heart symbol (heart-fill)
for (const country of countriesCopy) {
    if (favoritesList.includes(country.name.common)) {
        createCard(country);
        // updating the href property in the "more details" button of the mini-cards to match the current location of the user
        const cardInfoLinks = document.querySelectorAll(".card-footer a");
        cardInfoLinks.forEach((link) => {
            link.href = "../pages/details.html";
        });
    }
}

// defining all the heart icons in the page
const hearts = document.querySelectorAll("i");

// interacting with each heart icon in the page
hearts.forEach(heart => {
    heart.addEventListener("click", (event) => {
        // finding the closest .card element to the heart icon to interact with the correct card
        const card = event.target.closest(".card");

        if (card) {
            // defining the country name of the selected card
            const countryNameOfCard = card.querySelector(".card-title").textContent;

            // updating the heart icon when disliked
            if (heart.classList.contains("bi-heart-fill")) {
                heart.classList.replace("bi-heart-fill", "bi-heart");
            }

            // removing the country name of selected card from favoritesList key in localstorage
            let updatedFavoritesList = JSON.parse(localStorage.getItem("favoritesList")) || [];
            updatedFavoritesList = updatedFavoritesList.filter(favCountry => favCountry !== countryNameOfCard);
            localStorage.setItem("favoritesList", JSON.stringify(updatedFavoritesList));

            // remove the disliked card from the DOM
            card.remove();
        }
    });
});