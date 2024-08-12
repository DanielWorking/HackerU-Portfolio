import { wordList } from "./wordList.js";
import { resetGame, gameOver } from "./uiHandlers.js";

// game state variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// get a random word from the word list
export function getRandomWord() {
    try {
        const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
        currentWord = word;
        document.querySelector(".hint-text b").innerText = hint;
        resetGame(currentWord);
    } catch (error) {
        console.error("Error fetching a random word:", error);
    }
}

// handle game state when a letter is clicked
export function initGame(button, clickedLetter) {
    try {
        if (currentWord.includes(clickedLetter)) {
            // show correct letters
            [...currentWord].forEach((letter, index) => {
                if (letter === clickedLetter) {
                    correctLetters.push(letter);
                    const wordDisplay = document.querySelectorAll(".word-display li");
                    wordDisplay[index].innerText = letter;
                    wordDisplay[index].classList.add("guessed");
                }
            });
        } else {
            // update wrong guesses count and hangman image
            wrongGuessCount++;
            document.querySelector(".hangman-box img").src = `./images/hangman-${wrongGuessCount}.svg`;
        }
        button.disabled = true; // disable clicked button
        document.querySelector(".guesses-text b").innerText = `${wrongGuessCount} / ${maxGuesses}`;

        // check for game over conditions
        if (wrongGuessCount === maxGuesses) return gameOver(false, currentWord);
        if (correctLetters.length === currentWord.length) return gameOver(true, currentWord);
    } catch (error) {
        console.error("Error processing game state:", error);
    }
}

export function initializeGameVariables() {
    correctLetters = [];
    wrongGuessCount = 0;
}