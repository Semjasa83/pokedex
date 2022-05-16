let allPokemon = [];
let allPokemonArray = [];


//fetchen und Push der API ins Array - gesamt Load 
async function loadPokemon() {

    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=21`;
    let response = await fetch(url); //api fetchen und in Array allPokemon
    allPokemon = await response.json();
    loadAllPokemonData(allPokemon);
}


//unterlegte URLs ins zweite Array pushen
async function loadAllPokemonData(allPokemon) {
    for (let i = 0; i < allPokemon.results.length; i++) { //1te Array durchlaufen
        const pokemonUrl = allPokemon.results[i]['url']; //url aus 1 JSON Array
        let response = await fetch(pokemonUrl); //2te url Ebene fetchen
        pokemonArray = await response.json();
        allPokemonArray.push(pokemonArray); //aus 2ter URL die kompletten Daten in das 2te Array allPokemonArray
    }
    loadPokemonOverview();
}

//rendern fürs Overview und types zerpflücken
function loadPokemonOverview() {
    document.getElementById('overviewContent').innerHTML = '';
    for (let i = 0; i < allPokemonArray.length; i++) {
        document.getElementById('overviewContent').innerHTML +=
            templatePokemonOverview(allPokemonArray[i], i);
    }
}


function openPokemonInfo(i) {
    let detailValue = allPokemonArray[i];
    let detail = document.getElementById('pokemonPopup');
    detail.innerHTML = '';
    detail.innerHTML += `
    <div id="pokemonSingleBgr">
    <div id="pokemonSingleContainer">${templateSinglePokemon(detailValue)}</div>
    </div>`;
    detail.classList.remove("index-front");
    statsCalc(detailValue);
    return detail;

        /**
         *load templateSinglePokemon(allPokemonArray[i]) (( MUSS d-None haben! ))
         *
         *openPokemonInfo() -> d-none löschen 
         * 
         * 
         *    */
}

function closePokemonInfo() {
    let closeButton = document.getElementById('pokemonPopup');
    closeButton.classList.add("index-front");
}

function statsCalc(detailValue) {
    console.log(detailValue);
    let total = detailValue.stats[0].base_stat 
        + detailValue.stats[1].base_stat 
        + detailValue.stats[2].base_stat 
        + detailValue.stats[3].base_stat 
        + detailValue.stats[4].base_stat 
        + detailValue.stats[5].base_stat;
    console.log(total);
    document.getElementById('stats_total').innerHTML = total;
}


/*
function loadDetailTypes(){
    console.log();
}
*/

//template für Types
function templateTypes(pokemon) {
    let htmlCode = "";
    for (let index = 0; index < pokemon.types.length; index++) {
        const typesValue = pokemon.types[index];
        htmlCode += /*html*/`
        <div class="overview-type">
        <div id="overviewType">${typesValue.type['name']}</div>
        </div>`
    }
    return htmlCode;
}


function templatePokemonOverview(pokemon, i) {
    return /*html*/`
        <div id="overview" class="cursor" onclick="openPokemonInfo(${i})">
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
            </div> `;
}



function templateSinglePokemon(detailValue) {
    return /*html*/`
        <div id="pokedex">
            <div class="pokedex-center">
                <div class="align-left">
                    <img class="return-button cursor" src="img/arrow-left.png" onclick="closePokemonInfo()">
                </div>
                <h1 id="pokemonName">${detailValue.name}</h1>
                <span id="pokemonNumber">#${detailValue.id}</span>
                <div class="pokemon-type"></div>
            </div>
            <img id="pokemonAvatar" src="${detailValue.sprites.other.dream_world.front_default}">
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
                        <td id="stats_0">${detailValue.stats[0].base_stat}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td id="stats_1">${detailValue.stats[1].base_stat}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td id="stats_2">${detailValue.stats[2].base_stat}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sp.Atk</td>
                        <td id="stats_3">${detailValue.stats[3].base_stat}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sp.Def</td>
                        <td id="stats_4">${detailValue.stats[4].base_stat}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td id="stats_5">${detailValue.stats[5].base_stat}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td id="stats_total"></td>
                        <td></td>
                    </tr>
                </table>
                <!--
                <div class="type-defenses">
                    <h5>Type defenses</h5>
                    <span id="infoTypeDefenses">FIRE</span>
                </div>
-->
            </div>
        </div>
    `
}