// Get references to the two tables in the HTML document
const datesTable = document.getElementById("datesTable");
const winsTable = document.getElementById("winsTable");

// Define an array of player names
const players = ["X", "O", "Drow"];


// Function to create a new table row with two cells: one for the player name and one for a value
function createTableRow(player, value, table) {
    // the html elements inside the table
    let row = document.createElement("tr");
    let playerCell = document.createElement("td");
    let valueCell = document.createElement("td");

    // setting the value of the cells
    playerCell.textContent = player;
    valueCell.textContent = value;

    // Add the cells to the row
    row.appendChild(playerCell);
    row.appendChild(valueCell);

    // Add the row to the specified table
    table.appendChild(row);
}


// Function to show rows on the "dates" table
function showRowsOnTableOfDates() {
    players.forEach(player => {
        // Check if there is data stored in local storage for this player
        if (localStorage.getItem(player) != null) {
            // get the data stored in the player as JS content to get an array of the dates
            let playerDates = JSON.parse(localStorage.getItem(player));

            // Loop through each date and sending the data to create the row for the dates table - this way, for each date we create a row
            playerDates.forEach(date => {
                createTableRow(player, date, datesTable);
            });
        }
    })
}


// Function to show rows on the "wins" table
function showRowsOnTableOfWins() {
    players.forEach(player => {
        // Check if there is data stored in local storage for this player
        if (localStorage.getItem(player) != null) {
            // get the data stored in the player as JS content to get an array of the dates
            let playerDates = JSON.parse(localStorage.getItem(player));
            // sending the data to create the row for the wins table
            createTableRow(player, playerDates.length, winsTable);
        }
    })
}


// Run the program when the page loads
window.onload = function () {
    showRowsOnTableOfDates();
    showRowsOnTableOfWins();
}