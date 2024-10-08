//variables
const guessInput = document.querySelector("#guess");
const guessBtn = document.querySelector(".guess-btn");
const textBox = document.querySelector(".text");
const textBoxWrong = document.querySelector(".text-wrong");
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
    } else if (Number(guessInput.value) < 1 || Number(guessInput.value) > 100) {
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
    attempts++;
}

function displayAttempts() {
    highscoreText.innerHTML = `&#x1F973 &#x1F973 &#x1F973 &#x1F973 &#x1F973 
    Your highscore is ${attempts}!`;
}

function displayHighscore() {
    highscoreText.innerHTML = `&#x1F973 &#x1F973 &#x1F973 &#x1F973 &#x1F973 
    Your highscore is ${highscore}!`;
}

function checkForHighscore() {
    if (highscore == null) {
        localStorage.setItem("score", attempts);
        displayAttempts();
    } else if (attempts <= highscore) {
        localStorage.setItem("score", attempts);
        displayAttempts();
    } else {
        displayHighscore();
    }
}

function disableInputs() {
    const disabled = [guessBtn, guessInput];
    disabled.forEach(item =>{
        item.disabled = true;
        item.classList.add("disabled");
    }) 
    textBoxWrong.innerHTML = "";
    textBoxWrong.classList.add("hide");
}

function checkIfCorrect() {
    addToList();
    if (Number(guessInput.value) === secretNumber) {
        textBox.innerHTML = `Congratulations! 
        You guessed the right number in ${attempts} attempt(s)!`;
        checkForHighscore();
        playAgainBtn.classList.add("show");
        disableInputs();
    } else if (guessInput.value < secretNumber) {
        textBoxWrong.innerHTML = "Try higher!";
    } else {
        textBoxWrong.innerHTML = "Try lower!";
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
});

window.onload = checkInput;

// för debugging och att kunna fuska xD
console.log(`Pssst! Your secret number is ${secretNumber}`);
console.log(`Your highscore is ${highscore}`);


