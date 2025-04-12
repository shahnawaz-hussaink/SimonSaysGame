let gameSeq = [];
let userSeq = [];
const colors = ["red", "orange", "green", "blue"];
let started = false;
let level = 0;

const h2 = document.getElementById("level-title");
const buttons = document.querySelectorAll(".btn");

document.addEventListener("click", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randomColor = colors[Math.floor(Math.random() * 4)];
  gameSeq.push(randomColor);
  const button = document.querySelector(`.btn.${randomColor}`);

  setTimeout(() => flashButton(button), 500);
}

function flashButton(btn) {
  btn.classList.add("btn-flash");
  setTimeout(() => btn.classList.remove("btn-flash"), 250);
}

function handleButtonClick(btn) {
  if (!started) return;

  const color = btn.dataset.color;
  userSeq.push(color);
  flashButton(btn);
  checkAnswer(userSeq.length - 1);
}

function checkAnswer(currentIdx) {
  if (userSeq[currentIdx] === gameSeq[currentIdx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  h2.innerHTML = `Game Over! Score: <b>${level}</b><br>Tap to restart`;
  document.body.style.backgroundColor = "red";
  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 300);
  resetGame();
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleButtonClick(btn));
});
