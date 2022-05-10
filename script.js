let allPokemon = [];
let allPokemonArray = [];


async function loadPokemon() {

    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    let response = await fetch(url); //api fetchen und in Array allPokemon
    allPokemon = await response.json();
    console.log('loaded first 20 Pokemon', allPokemon); //CONSOLE

    loadAllPokemonData(allPokemon);
}

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

function loadPokemonOverview() {
    document.getElementById('overviewContent').innerHTML = '';
    
    for (let i = 0; i < allPokemonArray.length; i++) {
        console.log(allPokemonArray[i].name);
        let allPokemonName = allPokemonArray[i].name;
        let allPokemonAvatar = allPokemonArray[i].sprites.other.dream_world.front_default;
        document.getElementById('overviewContent').innerHTML += 
                    templatePokemonOverview(
                        allPokemonName, 
                        allPokemonAvatar);
    }

}

function templatePokemonOverview(allPokemonName, allPokemonAvatar) {
    return /*html*/`
        <div id="overviewSingle">
                <div id="overviewDescription">
                    <div id="overviewName">${allPokemonName}</div>
                    <div class="overview-seperate">
                        <div class="overview-type">
                            <div id="overviewType">Water</div>
                        </div>
                        <img id="overviewAvatar" src="${allPokemonAvatar}">
                    </div>
                </div>
            </div>
        `;
}