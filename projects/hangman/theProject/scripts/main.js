import { getRandomWord, initGame, initializeGameVariables } from "./gameLogic.js";
import { createKeyboard } from "./uiHandlers.js";

// initialize game on load
window.addEventListener("DOMContentLoaded", () => {
    try {
        initializeGameVariables();
        getRandomWord();
        createKeyboard(initGame);

        document.querySelector(".play-again").addEventListener("click", () => {
            initializeGameVariables();
            getRandomWord();
        });
    } catch (error) {
        console.error("Error initializing the game:", error);
    }
});