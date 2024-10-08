//variables
const guessInput = document.querySelector("#guess");
const guessBtn = document.querySelector(".guess-btn");
const textBox = document.querySelector(".text");
const warning = document.querySelector(".warning");
const list = document.querySelector(".list");
const secretNumber = Math.floor(Math.random() * 100) + 1;
const playAgainBtn = document.querySelector(".play-again");
let attempts = 0;
let highscore = localStorage.getItem("score");
const highscoreText = document.querySelector(".highscore-text");

//functions
function checkInput() {
    if (!guessInput.value) {
        warning.innerHTML = "Enter a number to begin!";
        guessBtn.disabled = true;
    } else if (guessInput.value < 1 || guessInput.value > 100) {
        warning.innerHTML = "Please enter a number between 1 and 100!";
        guessBtn.disabled = true;
    } else {
        warning.innerHTML = "";
        guessBtn.disabled = false;
    }
}

function addToList() {
    const li = document.createElement("li");
    li.innerHTML = guessInput.value;
    list.appendChild(li);
}

function displayHighscore() {
    highscoreText.innerHTML = `&#x1F973 &#x1F973 &#x1F973 &#x1F973 &#x1F973 
    Your highscore is ${attempts}!`;
}

function checkForHighscore() {
    if (highscore == null) {
        localStorage.setItem("score", attempts);
        displayHighscore();
    } else if (attempts <= highscore) {
        localStorage.setItem("score", attempts);
        displayHighscore();
    }
}

function disableInputs() {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    guessBtn.classList.add("disabled");
    guessInput.classList.add("disabled");
}

function checkIfCorrect() {
    attempts++;
    addToList();
    if (guessInput.value == secretNumber) {
        textBox.innerHTML = `Congratulations! 
        You guessed the right number in ${attempts} attempt(s)!`;
        checkForHighscore();
        playAgainBtn.classList.add("show");
        guessInput.disabled = true;
        guessBtn.disabled = true;
        disableInputs();
    } else if (guessInput.value < secretNumber) {
        textBox.innerHTML = "Try higher!";
    } else {
        textBox.innerHTML = "Try lower!";
    }
}

//event listeners
guessBtn.addEventListener("click", checkIfCorrect);

guessInput.addEventListener("input", checkInput);
guessInput.addEventListener("keydown", (keypress) => {
    if (keypress.key === "Enter") {
        guessBtn.click();
    }
});

playAgainBtn.addEventListener("click", () => {
    window.location.reload();
    playAgainBtn.classList.remove("show");
    guessBtn.classList.remove("disabled")
});

window.onload = checkInput;

// för debugging och att kunna fuska xD
console.log(`Pssst! Your secret number is ${secretNumber}`);
console.log(`Your highscore is ${highscore}`);
