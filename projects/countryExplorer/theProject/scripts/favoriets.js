// importing the function for creating the mini-cards
import { createCard, favorietsList } from "./domBuilder.js";
// importing the copy of the API data
import { countriesCopy } from "./countries.js";

// creating mini-cards only for countries the user clicked the heart symbol (heart-fill)
for (const country of countriesCopy) {
    for (const favoriteCountry of favorietsList) {
        if (country.name.common === favoriteCountry) {
            createCard(country);
            // updating the href property in the "more details" button of the mini-cards to match the current location of the user
            const cardInfoLinks = document.querySelectorAll(".card-footer a");
            cardInfoLinks.forEach((link) => {
                link.href = "./details.html";
            })
        }
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

            // removing the country name of selected card from favorietsList key in localstorage
            let favorietsList = JSON.parse(localStorage.getItem("favorietsList")) || [];
            if (heart.classList.contains("bi-heart")) {
                favorietsList = favorietsList.filter(favCountry => favCountry !== countryNameOfCard);
            }
            localStorage.setItem("favorietsList", JSON.stringify(favorietsList));

            // remove the disliked card from the DOM
            card.remove();
        }
    });
});