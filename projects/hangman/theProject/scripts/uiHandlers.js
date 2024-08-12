// reset the game UI
export function resetGame(currentWord) {
    try {
        document.querySelector(".hangman-box img").src = "./images/hangman-0.svg";
        document.querySelector(".guesses-text b").innerText = `0 / 6`;
        const wordDisplay = document.querySelector(".word-display");
        wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
        document.querySelectorAll(".keyboard button").forEach(btn => btn.disabled = false);
        document.querySelector(".game-modal").classList.remove("show");
    } catch (error) {
        console.error("Error resetting the game:", error);
    }
}

// handle game over UI updates
export function gameOver(isVictory, currentWord) {
    try {
        const modalText = isVictory ? 'You found the word:' : 'The correct word was:';
        const gameModal = document.querySelector(".game-modal");
        gameModal.querySelector("img").src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    } catch (error) {
        console.error("Error displaying game over modal:", error);
    }
}

// create the keyboard buttons
export function createKeyboard(initGame) {
    const keyboard = document.querySelector(".keyboard");
    // loop through the ASCII values of lowercase letters 'a' to 'z' (97 to 122)
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        // convert the ASCII value to its corresponding character and set it as the button's text
        button.innerText = String.fromCharCode(i);
        keyboard.appendChild(button);
        button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
    }
}