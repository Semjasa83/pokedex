let allPokemon = [];
let allPokemonArray = [];
let singlePokemonArray = [];


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
        //console.log('pokemonArray', allPokemon); //CONSOLE
        //console.log('allpokemonArray', allPokemonArray); //CONSOLE
    }
    loadPokemonOverview();
}

//rendern fürs Overview und types zerpflücken
function loadPokemonOverview() {
    document.getElementById('overviewContent').innerHTML = '';

    for (let i = 0; i < allPokemonArray.length; i++) {
        document.getElementById('overviewContent').innerHTML +=
            templatePokemonOverview(allPokemonArray[i]);
            console.log(allPokemonArray[i]);

            /**
             *Hier allPokemonArray[i] abgreifen
             *   */ 
    }

}

//template für Types
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
        <div id="overviewSingle" class="cursor">
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

function templateSinglePokemon() {
    return /*html*/`
    <div id="pokedex">
            <div class="pokedex-center">
                <div class="align-left">
                    <img id="returnButton" src="img/arrow-left.png">
                </div>
                <h1 id="pokemonName">Name</h1>
                <span id="pokemonNumber">#004</span>
                <div class="pokemon-type">
                    <div id="pokemonType">fire</div>
                </div>
            </div>
            <img id="pokemonAvatar">
        </div>
        <div class="info-pokemon">
            <div class="info-navigation">
                <a href="#">Base Stats</a>
                <a href="#">About</a>
                <a href="#">Evolution</a>
                <a href="#">Moves</a>
            </div>
            <div class="info-base-stats">
                <table class="info-stats-values">
                    <tr>
                        <td>HP</td>
                        <td>45</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>60</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>48</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sp.Atk</td>
                        <td>65</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sp.Def</td>
                        <td>65</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>45</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>317</td>
                        <td></td>
                    </tr>
                </table>
                <div class="type-defenses">
                    <h5>Type defenses</h5>
                    <span id="infoTypeDefenses">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </div>
            </div>
        </div>
    `
}