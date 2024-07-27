let player = "X"; // Current player, starts with X
let board = ["", "", "", "", "", "", "", "", ""]; // Represents the 3x3 game board
let message = document.getElementsByTagName("h2"); // Element to display game messages
let gameOver = false; // Flag to track if the game has ended
const restart = document.querySelector(".restart-button"); // Restart button element
let currentDate = new Date();

// Function to add leading zero if number is less than 10
function addZero(i) {
    return i < 10 ? "0" + i : i;
}

let hours = addZero(currentDate.getHours());
let minutes = addZero(currentDate.getMinutes());
let seconds = addZero(currentDate.getSeconds());
let day = addZero(currentDate.getDate());
let month = addZero(currentDate.getMonth() + 1);
let year = currentDate.getFullYear();
let winDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

// Initialize wins object with arrays for each player
let wins = {
    "X": JSON.parse(localStorage.getItem("X") || "[]"),
    "O": JSON.parse(localStorage.getItem("O") || "[]"),
    "Draw": JSON.parse(localStorage.getItem("Draw") || "[]")
};

// Function to handle a player's move
function makeMove(cellIndex, cell) {
    if (!gameOver && board[cellIndex] === "") {
        board[cellIndex] = player; // Update the board array
        cell.innerText = player; // Update the cell's display
        let result = checkWinner();
        if (result === 1) {
            message[0].innerText = "The winner is " + player;
            wins[player].push(winDate);
            localStorage.setItem(player, JSON.stringify(wins[player]));
            gameOver = true;
        }
        if (result === -1) {
            message[0].innerText = "It's a draw!";
            wins["Draw"].push(winDate);
            localStorage.setItem("Draw", JSON.stringify(wins["Draw"]));
            gameOver = true;
        }
        player = player === "X" ? "O" : "X"; // Switch to the other player
    }
}

// Function to check if there's a winner or a draw
function checkWinner() {
    // Check all possible winning combinations
    if ((board[0] === board[1] && board[1] === board[2] && board[0] != "") ||
        (board[3] === board[4] && board[4] === board[5] && board[3] != "") ||
        (board[6] === board[7] && board[7] === board[8] && board[6] != "") ||
        (board[0] === board[3] && board[3] === board[6] && board[0] != "") ||
        (board[1] === board[4] && board[4] === board[7] && board[1] != "") ||
        (board[2] === board[5] && board[5] === board[8] && board[2] != "") ||
        (board[0] === board[4] && board[4] === board[8] && board[0] != "") ||
        (board[2] === board[4] && board[4] === board[6] && board[2] != "")) {
        return 1; // There's a winner
    }

    // Check if it's a draw (all cells filled)
    if (!board.includes("")) {
        return -1; // It's a draw
    }

    return 0; // Game is still ongoing
}

// Add click event listeners to all cells
document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
        makeMove(index, cell);
    });
});

// Add click event listener to the restart button
restart.addEventListener("click", () => {
    window.location.reload(); // Reload the page to restart the game
});