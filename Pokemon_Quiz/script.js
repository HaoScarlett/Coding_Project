// 1. Get the Dom
const resultElement = document.getElementById("result");
const pokemonImage = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementById("container");
const loadingContainer = document.getElementById("loadingContainer");

// 7. Initialize variables
let usedPokemonIds = [];

// Challenge: make a request to API, it takes time
// asynchronous functionality
// 2. Fetch one Pokemon with an ID
async function fetchPokemonById(id) {
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
async function loadOptions() {
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
    // console.log(options);
    // console.log(optionsIds);
  }

  //   shuffleArray to mix options
  shuffleArray(options);
}

// --- UTILITY FUNCTIONS ---
// 4.  Function to randomize the pokemon ID
function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}

function shuffleArray(options) {
    
}