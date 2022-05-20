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
    loadPokeIndex();
}

//rendern fürs Overview und types zerpflücken
function loadPokeIndex() {
    document.getElementById('overviewContent').innerHTML = '';
    for (let i = 0; i < allPokemonArray.length; i++) {
        document.getElementById('overviewContent').innerHTML +=
            templatePokeIndex(allPokemonArray[i], i);
    }
}


function openPokeDetail(i) {
    let detailValue = allPokemonArray[i];
    let overlay = document.getElementById('pokemonPopup');
    let noscroll = document.getElementById('bodyScroll');
    templateOpenPokeDetail(detailValue, overlay);
    overlay.classList.remove("d-none");
    noscroll.classList.add("noscrolling");
    statsCalc(detailValue);
    return overlay;
}

function closePokeDetail() {
    let closePopup = document.getElementById('pokemonPopup');
    let scroll = document.getElementById('bodyScroll');
    closePopup.classList.add("d-none");
    scroll.classList.remove("noscrolling");
}

function statsCalc(detailValue) {
    let hp = detailValue.stats[0].base_stat;
    let attack = detailValue.stats[1].base_stat;
    let defense = detailValue.stats[2].base_stat;
    let spatk = detailValue.stats[3].base_stat;
    let spdef = detailValue.stats[4].base_stat;
    let speed = detailValue.stats[5].base_stat;
    let total = hp + attack + defense + spatk + spdef + speed;
    document.getElementById('stats_total').innerHTML = total;
    statsProgressBar(hp, attack, defense, spatk, spdef, speed);
}


/*
function loadDetailTypes(){
    console.log();
}
*/

//Progressbar
function statsProgressBar(hp, attack, defense, spatk, spdef, speed){
    document.getElementById("progress_0").style.width = hp + "%";
    document.getElementById("progress_1").style.width = attack + "%";
    document.getElementById("progress_2").style.width = defense + "%";
    document.getElementById("progress_3").style.width = spatk + "%";
    document.getElementById("progress_4").style.width = spdef + "%";
    document.getElementById("progress_5").style.width = speed + "%";
}

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

function templateOpenPokeDetail(detailValue, overlay) {
    overlay.innerHTML = '';
    overlay.innerHTML += `
    <div id="pokemonSingleBgr">
    <div id="pokemonSingleContainer">${templatePokeDetail(detailValue)}</div>
    </div>`;

    /* 4te forschleife für types */
}

function templatePokeIndex(pokemon, i) {
    return /*html*/`
        <div id="overview" class="cursor" onclick="openPokeDetail(${i})">
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


function templatePokeDetail(detailValue) {
    return /*html*/`
        <div id="pokedex" class="#">
            <div class="pokedex-center">
                <div class="align-left">
                    <div>
                    <img class="return-button cursor" src="img/arrow-left.png" onclick="closePokeDetail()">
                    </div>
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
            </div>
            <div class="info-base-stats">
                <table class="info-stats-values">
                    <tr>
                        <td>HP</td>
                        <td id="stats_0">${detailValue.stats[0].base_stat}</td>
                        <td class="progress"><span id="progress_0" class="progress-bar" style="width: 75%"></span></td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td id="stats_1">${detailValue.stats[1].base_stat}</td>
                        <td class="progress"><span id="progress_1" class="progress-bar" style="width: 75%"></span></td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td id="stats_2">${detailValue.stats[2].base_stat}</td>
                        <td class="progress"><span id="progress_2" class="progress-bar" style="width: 75%"></span></td>
                    </tr>
                    <tr>
                        <td>Sp.Atk</td>
                        <td id="stats_3">${detailValue.stats[3].base_stat}</td>
                        <td class="progress"><span id="progress_3" class="progress-bar" style="width: 75%"></span></td>
                    </tr>
                    <tr>
                        <td>Sp.Def</td>
                        <td id="stats_4">${detailValue.stats[4].base_stat}</td>
                        <td class="progress"><span id="progress_4" class="progress-bar" style="width: 75%"></span></td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td id="stats_5">${detailValue.stats[5].base_stat}</td>
                        <td class="progress"><span id="progress_5" class="progress-bar" style="width: 75%"></span></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td id="stats_total"></td>
                        <td class="noprogress"></td>
                    </tr>
                </table>
            </div>
        </div>
    `
}