import { countriesCopy, search, reset } from "./countries.js";

// the container for all the cards of the countries
const cardsList = document.getElementById("cardsList");

// the search bar
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        reset();
        cardsList.innerHTML = ""; // cardsList is now defined before use
        search(event.target.value.trim());
        createCardList();
    });
}

// getting the favorietsList value and if there is no value create one as empty array
let favorietsList = JSON.parse(localStorage.getItem('favorietsList')) || [];

const createCard = (country) => {
    // the card container
    const card = document.createElement("div");
    card.className = "card shadow-lg m-2 col-md-3 col-sm-12";

    // the card image
    const cardImage = document.createElement("img");
    cardImage.className = "card-img-top mt-2 border-rounded";
    // accessing the country flag from api
    cardImage.src = country.flags.png;

    // the card body for text and link
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // the card title = country name
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    // accessing the country name from api
    cardTitle.textContent = country.name.common;

    // the card second title = country capital
    const cardCapital = document.createElement("h6");
    cardCapital.className = "card-title";
    // Check if `country.capital` exists and is an object before using it
    if (country.capital && Object.values(country.capital).length > 0) {
        cardCapital.textContent = `Capital: ${Object.values(country.capital).join(", ")}`;
    } else {
        cardCapital.textContent = "The Country Has No Capital";
    }

    const cardLanguage = document.createElement("p");
    cardLanguage.className = "card-text";
    // Check if `country.languages` exists and is an object before using it
    if (country.languages && Object.values(country.languages).length > 0) {
        cardLanguage.textContent = Object.values(country.languages).join(", ");
    } else {
        cardLanguage.textContent = "The Country Has No Official Language";
    }

    // the card button to view more details on country
    const cardInfo = document.createElement("a");
    cardInfo.className = "btn bg-primary text-white";
    cardInfo.textContent = "More Details";
    cardInfo.href = "./pages/details.html";
    // storing the country of selected card for usage in the details file
    cardInfo.addEventListener("click", () => {
        localStorage.setItem("countryName", JSON.stringify(country.name.common));
    })

    // the card footer for adding the country to favorites using localStorage
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer d-flex justify-content-between";

    // the heart icon for adding/removing country from favorites
    const heart = document.createElement("i");
    heart.className = "bi bi-heart";

    // click event to handle add/remove from favorites
    heart.addEventListener("click", () => {
        // to make sure only the heart class is changed in case more classes will be added
        if (heart.classList.contains("bi-heart")) {
            heart.classList.replace("bi-heart", "bi-heart-fill");
            // pushing the country name to the array of favorietsList key in localStorage
            favorietsList.push(cardTitle.textContent);
        } else {
            heart.classList.replace("bi-heart-fill", "bi-heart");
            // remove the country name from array in localStorage when removing like on the card
            let itemIndex = favorietsList.indexOf(cardTitle.textContent);
            if (itemIndex !== -1) {
                favorietsList.splice(itemIndex, 1);
            }
        }
        localStorage.setItem('favorietsList', JSON.stringify(favorietsList));
    })

    // checking if the country has already been added to favoriets
    if (favorietsList.includes(country.name.common)) {
        heart.classList.replace("bi-heart", "bi-heart-fill");
    }

    // appending the elements to structure the card
    cardsList.appendChild(card);
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCapital);
    cardBody.appendChild(cardLanguage);
    cardFooter.appendChild(heart);
    cardFooter.appendChild(cardInfo);
}

// creating card for each country
const createCardList = () => {
    for (const country of countriesCopy) {
        createCard(country);
    }
};

export { createCard, createCardList, favorietsList };