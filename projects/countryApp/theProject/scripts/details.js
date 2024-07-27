// ___________________________add to the more details page
// the the card paragraph for population
const cardPopulation = document.createElement("p");
cardPopulation.className = "card-text";
// accessing the country population data from api
cardPopulation.textContent = `Population: ${country.population.toLocaleString()}`; // to format the number with "," after 3 digits