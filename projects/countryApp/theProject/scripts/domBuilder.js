import { countriesCopy, search, reset } from "./countries.js";

// the search bar
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keydown", (event) => {
    reset();
    cardsList.innerHTML = "";
    search(event.target.value.trim());
    createCardList();
})

// creating array empty array to contain all the cards name for favoriets page
let favoriets = localStorage.setItem("favoriets", JSON.stringify([]));
// getting the array from localstorage for manipulating the item
let favorietsList = JSON.parse(localStorage.getItem("favoriets"));


// the container for all the cards of the countries
const cardsList = document.getElementById("cardsList");

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
    // accessing the country capital name from api
    if (Object.values(country.capital).length == 0) { // dealing with situation where the country doesnt have a capital
        cardCapital.textContent = "The Country Has No Capital";
    } else {
        cardCapital.textContent = `Capital: ${Object.values(country.capital).join(", ")}`; // accessing the values of capital and seperating with comma
    }

    // the card paragraph for languages
    const cardLanguage = document.createElement("p");
    cardLanguage.className = "card-text";
    // accessing the country languages from api
    cardLanguage.textContent = Object.values(country.languages).join(", "); // takes the values from the object and then join them  into a single string with each language name seperated by a comma and space

    // the card button to view more details on country
    const cardInfo = document.createElement("a");
    cardInfo.className = "btn bg-primary text-white";
    cardInfo.textContent = "More Details";
    // the link to view more info of the country_______________________________need to update url to the next html file
    cardInfo.href = "#";

    // the card footer for adding the country to favorits using localstorage
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer d-flex justify-content-between";
    const heart = document.createElement("i");
    heart.className = "bi bi-heart";

    heart.addEventListener("click", () => {
        if (heart.className === "bi bi-heart") {
            heart.className = "bi bi-heart-fill";
            // adding the country name to the favorietsList key in localStorage _________________add code
            JSON.stringify(favorietsList.push(cardTitle.textContent));
            console.log(favorietsList);

        } else {
            heart.className = "bi bi-heart";
            // making sure to remove the country name from the localStorage_______-check in localStorage
            let itemIndex = favorietsList.indexOf(cardTitle.textContent);
            if (itemIndex !== -1) {
                favorietsList.splice(itemIndex, 1);
            }
            JSON.stringify(localStorage.setItem("favoriets", favorietsList));
        }
    })

    // appending the elements to stravture the card
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

export { createCard, createCardList };