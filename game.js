let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

$(".btn").on("click", function () {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
});

function nextSequence() {
  const randomNum = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNum];
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

  let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
