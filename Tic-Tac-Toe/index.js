// Dom elements
// Square
const square1 = document.getElementById("grid__square-1");
const square2 = document.getElementById("grid__square-2");
const square3 = document.getElementById("grid__square-3");
const square4 = document.getElementById("grid__square-4");
const square5 = document.getElementById("grid__square-5");
const square6 = document.getElementById("grid__square-6");
const square7 = document.getElementById("grid__square-7");
const square8 = document.getElementById("grid__square-8");
const square9 = document.getElementById("grid__square-9");
const allSquares = document.querySelectorAll(".grid__square");

// Players' score
const player1Score = document.getElementById("info__player__score1");
const player2Score = document.getElementById("info__player__score2");

// Instructions
const infoText = document.getElementById("instruction__text");
const startGameBtn = document.getElementById("instruction__btn");

// Model
const model = document.getElementById("model");

// Variables
const players = {
  player1: {
    name: "A",
    wins: 0,
  },
  player2: {
    name: "B",
    wins: 0,
  },
};

let move = 1;
let nextPlayer = players.player1.name;
let pastPlayer;
let currentImage = "cross";
let playerHasWon = false;

// Square clicking
function addSquareClick() {
  allSquares.forEach((square) => {
    square.addEventListener("click", squareClick);
  });
}

function removeSquareClick() {
  allSquares.forEach((square) => {
    square.removeEventListener("click", squareClick);
  });
}

function squareClick() {
  if (!this.classList.contains("cross") && !this.classList.contains("circle")) {
    this.classList.add(`${currentImage}`);
    incrementMove();
  }
}
// const squareClick = function() {
//     this.classList.add(`${currentImage}`);
//   }.bind(this);

addSquareClick();

// Increment Move
function incrementMove() {
  move += 1;
  if (move % 2 !== 0) {
    nextPlayer = players.player1.name;
    pastPlayer = players.player2.name;
    currentImage = "cross";
    infoText.innerHTML = `${players.player1.name}'s turn`;
  } else {
    nextPlayer = players.player2.name;
    pastPlayer = players.player1.name;
    currentImage = "circle";
    infoText.innerHTML = `${players.player2.name}'s turn`;
  }
  checkForWin();
  checkForTie();
}

function checkForWin() {
  const lines = [
    [square1, square2, square3],
    [square4, square5, square6],
    [square7, square8, square9],
    [square1, square4, square7],
    [square2, square5, square8],
    [square3, square6, square9],
    [square1, square5, square9],
    [square3, square5, square7],
  ];

  for (const line of lines) {
    const hasCross = line.every((square) => square.classList.contains("cross"));
    const hasCircle = line.every((square) =>
      square.classList.contains("circle")
    );
    if (hasCross || hasCircle) {
      const winner = hasCross ? players.player1 : players.player2;
      winner.wins += 1;
      updateScores();
      playerWon();
      return;
    }
  }
}

function updateScores() {
  player1Score.innerHTML = players.player1.wins;
  player2Score.innerHTML = players.player2.wins;
}

function playerWon() {
  infoText.innerHTML = `${pastPlayer} won! 🥳`;
  playerHasWon = true;
  continueGame();
}

function checkForTie() {
  const squares = [
    square1,
    square2,
    square3,
    square4,
    square5,
    square6,
    square7,
    square8,
    square9,
  ];

  const allSquaresFilled = squares.every((square) => {
    return (
      square.classList.contains("cross") || square.classList.contains("circle")
    );
  });

  if (allSquaresFilled && !playerHasWon) {
    infoText.innerHTML = "It's a tie!";
    continueGame();
  }
}

// Continue - Restart - Reset
function continueGame() {
  removeSquareClick();
  setTimeout(() => {
    reset();
  }, 2000);
}

function restartGame() {
  removeSquareClick();
  reset();
}

function reset() {
  allSquares.forEach((square) => {
    square.classList = "grid__square";
  });
  addSquareClick();
  playerHasWon = false;
  infoText.innerHTML = `${nextPlayer}'s turn to start.👾`;
}

// Start
function startGame() {
  startGameBtn.addEventListener("click", () => {
    model.style.display = "flex";
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const player1Input = document
      .getElementById("player1")
      .value.trim()
      .toLowerCase();
    const player2Input = document
      .getElementById("player2")
      .value.trim()
      .toLowerCase();

    const player1InputCap =
      player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
    const player2InputCap =
      player2Input.charAt(0).toUpperCase() + player2Input.slice(1);

    players.player1.name = player1InputCap;
    players.player2.name = player2InputCap;
    nextPlayer = player1InputCap;

    document.getElementById("info__player__name1").innerHTML =
      players.player1.name;
    document.getElementById("info__player__name2").innerHTML =
      players.player2.name;

    players.player1.wins = 0;
    players.player2.wins = 0;
    updateScores();

    infoText.innerHTML = `${players.player1.name}'s turn to start!`;
    model.style.display = "none";

    startGameBtn.innerHTML = "Restart the Game";
    addSquareClick();
    restartGame();
  });
}

startGame();
