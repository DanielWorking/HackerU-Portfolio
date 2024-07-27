// fetching the data from the api
// perhaps its best to create the function as a variable insted of needing to call the function
async function getCountriesApiData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
}


// creating a deep copy of the data from api to guard the original data from any unwanted changes
const fullCountriesData = await getCountriesApiData();
let countriesCopy = JSON.parse(JSON.stringify(fullCountriesData));


// when typing text in the search bar, only the card that include the text will appear
const search = (text) => {
    countriesCopy = countriesCopy.filter(country => {
        let countryName = country.name.common.toLowerCase();
        return countryName.includes(text.toLowerCase());
    })
}

// when there is no string in the search bar, to make sure all the cards are shown as the starting point
const reset = () => {
    countriesCopy = JSON.parse(JSON.stringify(fullCountriesData));
}



export { countriesCopy, getCountriesApiData, search, reset };