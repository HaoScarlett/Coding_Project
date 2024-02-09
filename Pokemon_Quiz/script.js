// 1. Get the Dom
const resultElement = document.getElementById("result");
const pokemonImage = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementById("container");
const loadingContainer = document.getElementById("loadingContainer");

// Challenge: make a request to API, it takes time
// asynchronous functionality

// 2. Fetch one Pokemon with an ID
async function fetchPokemonById(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1")
    // Take the response and transform it to json format
    const data = await response.json();
    return data;
}

// 3. Create a test function of step 2
// async function testFetch(){
//     const pokemon = await fetchPokemonById();
//     console.log(pokemon);
// }
