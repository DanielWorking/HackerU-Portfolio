// function to show error message
export default function displayErrorMessage(message) {
    const errorHandling = document.getElementById("error-handling");
    errorHandling.textContent = message;
    // Show or hide based on if there is a message need to be displayed
    errorHandling.style.display = message ? 'block' : 'none';
}