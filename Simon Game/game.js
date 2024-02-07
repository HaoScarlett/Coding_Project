const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
// Keep track of whether the game has started or not
let started = false;
let level = 0;

// Keypress fn
$(document).on("keypress", function () {
  if (!started) {
    // when the game start, change title to "Level 0"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  // tapCount > 1 ? false : nextSequence();
  // tapCount++;
  // Notice starting level
});

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Debugger
  console.log(userClickedPattern);

  // let audio = new Audio("sounds/" + userChosenColour + ".mp3");
  // audio.play();
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer,
  // 🔸 the argument: the index of the last answer in the user's sequence.(?)
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  // Increase the level by 1 every time this fn is called
  level++;
  // Update the h1 with this change in the value of level
  $("#level-title").text("Level " + level);

  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  // Debugger
  console.log(gamePattern);

  // Wrong. No id name is 'randomChosenColour': $("#randomChosenColour").click
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // $("#randomChosenColour".click(function(){
  //     $(this).play();
  // }
  // ))

  // let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // audio.play();
  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Add animation to user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Check user input and the Game sequence
function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Debugger
    console.log("Sucess!");
    // If the user got the most recent answer right in step 3,
    // check that they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    // Debugger
    console.log("Wrong.");

    // Game over part
    playSound("wrong");
    setTimeout(function () {
      $("body").addClass("game-over");
    }, 0);
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}
