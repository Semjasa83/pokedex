let allPokemon = [];
let allPokemonArray = [];


//fetchen und Push der API ins Array - gesamt Load 
async function loadPokemon() {

    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=21`;
    let response = await fetch(url); //api fetchen und in Array allPokemon
    allPokemon = await response.json();
    //console.log('loaded first 20 Pokemon', allPokemon); //CONSOLE

    loadAllPokemonData(allPokemon);
}


//unterlegte URLs ins zweite Array pushen
async function loadAllPokemonData(allPokemon) {

    for (let i = 0; i < allPokemon.results.length; i++) { //1te Array durchlaufen
        const pokemonUrl = allPokemon.results[i]['url']; //url aus 1 JSON Array
        let response = await fetch(pokemonUrl); //2te url Ebene fetchen
        pokemonArray = await response.json();

        allPokemonArray.push(pokemonArray); //aus 2ter URL die kompletten Daten in das 2te Array allPokemonArray
        console.log(pokemonArray); //CONSOLE

    }
    loadPokemonOverview();
}


//rendern fürs Overview und types zerpflücken
function loadPokemonOverview() {
    document.getElementById('overviewContent').innerHTML = '';

    for (let i = 0; i < allPokemonArray.length; i++) {
        //console.log(allPokemonArray[i].name);
        document.getElementById('overviewContent').innerHTML +=
            templatePokemonOverview(allPokemonArray[i]);
    }

}

function templateTypes(pokemon) {

    let htmlCode = "";
    for (let index = 0; index < pokemon.types.length; index++) {
        const typesValue = pokemon.types[index];
        htmlCode += /*html*/`
        <div class="overview-type">
        <div id="overviewType">${typesValue.type['name']}</div>
        </div>
        `        
    }
    return htmlCode;
}

function templatePokemonOverview(pokemon) {
    return /*html*/`
        <div id="overviewSingle">
                <div class="overview-description">
                    <div class="overview-seperate justify">
                        <div class="overview-name">${pokemon.name}</div>
                        <div class="overview-id">#${pokemon.id}</div>
                    </div>
                    <div class="overview-seperate">
                        <div>${templateTypes(pokemon)}</div>
                        <img id="overviewAvatar" src="${pokemon.sprites.other.dream_world.front_default}">
                    </div>
                </div>
            </div>
        `;
}