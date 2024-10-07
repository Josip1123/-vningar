//variables
const guessInput = document.querySelector("#guess");
const guessBtn = document.querySelector(".guess-btn");
const textBox = document.querySelector(".text");
const warning = document.querySelector(".warning");
const list = document.querySelector(".list");
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

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

function increaseAttempts() {
    attempts++;
}

function addToList() {
    const li = document.createElement("li");
    li.innerHTML = guessInput.value;
    list.appendChild(li);
}


function checkIfCorrect() {
    increaseAttempts();
    addToList();
    if (guessInput.value == secretNumber) {
        textBox.innerHTML = `Congratulations! You guessed the right number in ${attempts} attempt(s)!`;
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

window.onload = checkInput;

// för debugging och att kunna fuska xD
console.log(secretNumber);  
