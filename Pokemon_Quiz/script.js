// 1. Get the Dom
const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementsByClassName("container");
const loadingContainer = document.getElementById("loadingContainer");

// 7.1 Initialize variables
let usedPokemonIds = [];
let count = 0; // 14.3
let points = 0; // 14.8
let showLoading = false;
// Challenge: make a request to API, it takes time
// asynchronous functionality
// 2. Fetch one Pokemon with an ID
async function fetchPokemonById(id) {
  showLoading = true;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  // Take the response and transform it to json format
  const data = await response.json();
  return data;
}

// 3. Create a test function of step 2
// async function testFetch() {
//   const pokemon = await fetchPokemonById(getRandomPokemonId());
//   console.log(pokemon);
// }

// 5. Function to load questioin with options
async function loadQuestionWithOptions() {
  if (showLoading) {
    showLoadingWindow();
    hidePuzzleWindow();
  }

  // 6. Fetch the correct answer first
  let pokemonId = getRandomPokemonId();

  // 7.2 Check if current question has been used
  while (usedPokemonIds.includes(pokemonId)) {
    pokemonId = getRandomPokemonId();
  }
  // 7.3 If pokemon has not been displayed, it's added
  //   to usedPokemonIds. It's set as a new const
  //   pokemon.
  usedPokemonIds.push(pokemonId);
  const pokemon = await fetchPokemonById(pokemonId);

  //   8. Create options array
  //   now pokemon is an object hoding all the data about this pokemon
  const options = [pokemon.name];
  const optionsIds = [pokemon.id];

  //   9. Fetch addtional random Pokemon names as options
  while (options.length < 4) {
    let randomPokemonId = getRandomPokemonId();
    // 9.2 Ensure fetched option doesn't exist in the options list.
    // Creates a new random id until it doesn't exist in optionsIds.
    while (optionsIds.includes(randomPokemonId)) {
      randomPokemonId = getRandomPokemonId();
    }
    optionsIds.push(randomPokemonId);
    // 9.3 Fetching a random pokemon with the newly made ID,
    // and adding it to the options array.
    const randomPokemon = await fetchPokemonById(randomPokemonId);
    const randomOption = randomPokemon.name;
    options.push(randomOption);

    // Test
    console.log(options);
    console.log(optionsIds);
    // 15.5 Turn off loading if all options have been fetched.
    if (options.length === 4) {
      showLoading = false;
    }
  }

  //   shuffleArray to mix options
  shuffleArray(options);

  // 12. Clear any previous result and update pokemon image to fetched
  // image URL from the sprites.
  resultElement.textContent = "Who's that Pokemon?";
  pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;

  // 13. Create options HTML elements from options array in the DOM
  optionsContainer.innerHTML = ""; //Reset
  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = (event) => checkAnswer(option === pokemon.name, event);
    optionsContainer.appendChild(button); // Add the btns back
  });

  // 15. Switch between loading and puzzle windows
  if (!showLoading) {
    hideLoadingWindow();
    showPuzzleWindow();
  }
}

// 14. Create check answer function
function checkAnswer(isCorrect, event) {
  // 14.1 Check if any btn is already selected.
  // if falsy => no element => null
  const selectedButton = document.querySelector(".selected");
  // 14.2 if truthy, do nothing, exit the function
  if (selectedButton) {
    return;
  }
  // 14.4 else mark the clicked bt as selected and increase the count by 1
  event.target.classList.add("selected");
  count++;
  totalCount.textContent = count;

  if (isCorrect) {
    displayResult("Correct Answer!");
    // 14.8 Increment the points by 1
    points++;
    pointsElement.textContent = points;
    event.target.classList.add("correct");
  } else {
    displayResult("Wrong Answer...");
    event.target.classList.add("wrong");
  }

  // 14.9 Load the next question with 1 sec delay for the user
  // to read the result.
  setTimeout(() => {
    showLoading = true;
    loadQuestionWithOptions();
  }, 1000);
}

// --- UTILITY FUNCTIONS ---
// 4.  Function to randomize the pokemon ID
function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}

// 11. Shuffle the array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 14.5 Function to update the result text and class name
function displayResult(result) {
  resultElement.textContent = result;
}

//  16. Hide loading
function hideLoadingWindow() {
  loadingContainer.classList.add("hide");
}

// 17. Show loading window
function showLoadingWindow() {
  mainContainer[0].classList.remove("show");
  loadingContainer.classList.remove("hide");
  loadingContainer.classList.add("show");
}

// 18. Show puzzle window
function showPuzzleWindow() {
  loadingContainer.classList.remove("show");
  mainContainer[0].classList.remove("hide");
  mainContainer[0].classList.add("show");
}

// 19. Hide puzzle window
function hidePuzzleWindow(){
  mainContainer[0].classList.add("hide");

  
}