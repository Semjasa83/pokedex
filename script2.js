
   
let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded Pokemon', currentPokemon);

    //renderPokemonInfo();
    renderPokemonOverviewInfo();
}
/*
function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonAvatar').src = currentPokemon ['sprites']['other']['dream_world']['front_default'];
}
*/
function renderPokemonOverviewInfo() {
    document.getElementById('overviewName').innerHTML = currentPokemon['results'][2]['name'];
    document.getElementById('overviewAvatar').src = currentPokemon ['sprites']['other']['dream_world']['front_default'];
    document.getElementById('overviewType').innerHTML = currentPokemon['types'][2]['type']['name'];
}