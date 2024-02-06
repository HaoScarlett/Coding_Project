let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
let level = 0;

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  // let audio = new Audio("sounds/" + userChosenColour + ".mp3");
  // audio.play();
  playSound(userChosenColour);

  animatePress(userChosenColour);
});

function nextSequence() {
  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  // Wrong. No id name is 'randomChosenColour': $("#randomChosenColour").click
  $("#" + randomChosenColour)
    .fadein(100)
    .fadeOut(100)
    .fadein(100);

  // $("#randomChosenColour".click(function(){
  //     $(this).play();
  // }
  // ))

  // let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  // audio.play();
  playSound(randomChosenColour);

  level++;
  $("#level-title").replaceWith("<h1>Level ${level}</h1>");
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

// Start the Game. Detect a keypress
// Only call nextSequence() on the first keypress 
$("document").on("keydown", function(){
  let tapCount = 0;
  tapCount > 1 ? false : nextSequence();
  tapCount++;
  // Notice starting level
  $("#level-title").replaceWith("<h1>Level 0</h1>");
  
})