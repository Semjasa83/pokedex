let allPokemon = [];
let allPokemonArray = [];


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    let response = await fetch(url);
    allPokemon = await response.json();

    console.log('loaded first 20 Pokemon', allPokemon);

    renderOverview(allPokemon);
}

async function renderOverview(allPokemon) {

    //let overview = document.getElementById('overviewContent');
    //overview.innerHTML = '';

    for (let i = 0; i < allPokemon.results.length; i++) { //1te Array durchlaufen
        const pokemonUrl = allPokemon.results[i]['url']; //url aus 1 JSON Array
        let response = await fetch(pokemonUrl);
        pokemonArray = await response.json();
        
        //console.log(allPokemon.results[i]['name']);
        allPokemonArray.push(pokemonArray);
        console.log(pokemonArray);

    }

}