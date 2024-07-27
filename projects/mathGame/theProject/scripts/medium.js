// the types of possible operators in the game
const operators = ["*", "/"];

let num1 = document.getElementById("num1");
let operator = document.getElementById("operator");
let num2 = document.getElementById("num2");
let userAnswer = document.getElementById("userAnswer");
let rightOrWrongMsg = document.getElementById("rightOrWrongMsg");

let checkBtn = document.getElementById("checkBtn");
let newExerciseBtn = document.getElementById("newExerciseBtn");


// generating the numbers of the equation
function generateNum() {
    let randomNum1, randomNum2;

    if (operator.value === "/") {
        // Generate num2 first (divisor)
        randomNum2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
        // Generate a multiplier (1 to 10)
        let multiplier = Math.floor(Math.random() * 10) + 1;
        // Calculate num1 to ensure integer division
        randomNum1 = randomNum2 * multiplier;
    } else {
        randomNum1 = Math.floor(Math.random() * 49) + 1;
        randomNum2 = Math.floor(Math.random() * 49) + 1;
    }

    num1.innerText = randomNum1;
    num2.innerText = randomNum2;
}


// generating operator in random for each exercise
function generateOperator() {
    let operatorIndex = Math.floor(Math.random() * operators.length);
    operator.value = operators[operatorIndex];
    operator.innerText = operator.value;
}


// check if the user answer is correct when check answer button is clicked
checkBtn.addEventListener("click", () => {
    let correctAnswer;
    let num1InEquation = Number(num1.innerText);
    let num2InEquation = Number(num2.innerText);
    let userInputValue = Number(userAnswer.value);

    switch (operator.innerText) {
        case "*":
            correctAnswer = num1InEquation * num2InEquation;
            break;
        case "/":
            correctAnswer = num1InEquation / num2InEquation;
            break;
    }

    if (correctAnswer === userInputValue) {
        userAnswer.style.color = "#27ae60";
        rightOrWrongMsg.innerText = "correct answer!";
        rightOrWrongMsg.style.color = "#27ae60";
    } else {
        userAnswer.style.color = "red";
        rightOrWrongMsg.innerText = "wrong answer! try again";
        rightOrWrongMsg.style.color = "red";
    }
});


// generate new exercise when button new exercise is clicked
newExerciseBtn.addEventListener("click", () => {
    generateEquation();
    userAnswer.value = "0";
})


// function to activate all the game functionality
function generateEquation() {
    generateNum();
    generateOperator();
}

generateEquation();