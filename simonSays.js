// Arrays to store sequences of button clicks by the game and user
let gameSeq = []; // Tracks the sequence the game generates
let userSeq = []; // Tracks the sequence the user clicks
let btns = ["red", "green", "orange", "blue"]; // Button colors

let started = false; // Flag to check if the game has started
let level = 0; // Game level

let h2 = document.querySelector("h2"); // The heading element to show the current level or game over message

// Event listener to start the game when any key is pressed
document.addEventListener("keypress", function () {
    if (started == false) { 
        started = true;
    }
    levelUp(); // Move to the next level
});

// Function to make the button "flash" (add and remove a flashing class)
function flashButton(btn) {
    btn.classList.add("btn-flash"); // Add flash effect class

    setTimeout(function () {
        btn.classList.remove("btn-flash"); // Remove flash effect after 250ms
    }, 250);
}

// Function to increase the level and add a random button to the game sequence
function levelUp() {
    userSeq = []; // Clear user sequence when moving to a new level
    level++; // Increment the level
    h2.innerText = `Level ${level}`; // Display the current level

    let randIdx = Math.floor(Math.random() * 4); // Randomly select an index (0-3)
    let randcolor = btns[randIdx]; // Get the color corresponding to the random index
    let randBtn = document.querySelector(`.${randcolor}`); // Select the button element by class

    // Storing the randomly selected color into the game sequence array
    gameSeq.push(randcolor);

    // Flash the randomly selected button
    flashButton(randBtn);
}

// Function to check if the user's answer is correct
function checkAns(idx) {
    // Check if the user's button press matches the game sequence
    if (userSeq[idx] == gameSeq[idx]) {
        // If user has matched the entire sequence
        if (userSeq.length == gameSeq.length) {
            // If the user has completed the sequence, level up after 1 second
            setTimeout(levelUp, 1000);
        }
    } else {
        // If the user clicked the wrong button, game over
        h2.innerHTML = `Game Over! Your Score is <b>${level} </b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },250);
        resetGame(); // Reset the game state
    }
}

// Function to handle a button press by the user
function btnPress(btn) {
    flashButton(btn); // Flash the button to indicate it was pressed

    let userColor = btn.getAttribute("id"); // Get the color (id) of the clicked button
    userSeq.push(userColor); // Add the color to the user's sequence
    checkAns(userSeq.length - 1); // Check if the user's last press is correct
}

// Select all buttons with the class "btn" and add event listeners for user clicks
let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    // Add click event listener to each button
    btn.addEventListener("click", function () {
        btnPress(this); // Call btnPress and pass the clicked button as "this"
    });
}

// Function to reset the game after a game over
function resetGame() {
    started = false; // Set started flag to false to restart the game
    gameSeq = []; // Clear the game sequence
    userSeq = []; // Clear the user's sequence
    level = 0; // Reset level to 0
};

