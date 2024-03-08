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
}

