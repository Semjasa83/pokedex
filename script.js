
   
let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=999';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded Pokemon', currentPokemon);

    renderPokemonInfo();
    renderPokemonOverviewInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonAvatar').src = currentPokemon ['sprites']['other']['dream_world']['front_default'];
}

function renderPokemonOverviewInfo() {
    document.getElementById('OverviewName').innerHTML = currentPokemon['results'][i]['name'];
    document.getElementById('OverviewAvatar').src = currentPokemon ['sprites']['other']['dream_world']['front_default'];
    document.getElementById('OverviewType').innerHTML = currentPokemon['types'][0]['type']['name'];
}