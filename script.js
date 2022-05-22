let allPokeArray = [];
let allPokeData = [];
let offset = 22;
let index = 1;

async function loadPokemon() {
    for (let index = 1; index < offset; index++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(url);
        allPokemon = await response.json();
        allPokeArray.push(allPokemon);
    }
    console.log(allPokeArray);
    loadPokeIndex();
}


async function loadPokeIndex() {
    document.getElementById('overviewContent').innerHTML = '';
    for (let i = 0; i < allPokeArray.length; i++) {
        document.getElementById('overviewContent').innerHTML +=
            templatePokeIndex(i);
    }
}

function openPokeDetail(i) {
    let detailValue = allPokeArray[i];
    let overlay = document.getElementById('pokemonPopup');
    let noscroll = document.getElementById('bodyScroll');
    templateOpenPokeDetail(detailValue, overlay);
    overlay.classList.remove("d-none");
    noscroll.classList.add("noscrolling");
    statsCalc(detailValue);
}

function closePokeDetail() {
    let closePopup = document.getElementById('pokemonPopup');
    let scroll = document.getElementById('bodyScroll');
    closePopup.classList.add("d-none");
    scroll.classList.remove("noscrolling");
}

function statsCalc(detailValue) {
    let sum = 0;
    for (let y = 0; y < detailValue.stats.length; y++) {
        let element = detailValue.stats[y];
        sum += detailValue.stats[y].base_stat;
        console.log(element.base_stat);
        statsCalcProgressBar(element.base_stat, sum);
    }
    returnSum(sum);
}

function returnSum(sum) {
    document.getElementById("stats_total").innerHTML = sum;
}

function statsCalcProgressBar(element, sum) {
    let w = element;
    let g = sum;
    let p = (w / g)* 100;
    templateProgressBar(p);
    console.log(p);
}


function templateProgressBar(p) {
    document.getElementById("progress_0").style.width = p.toFixed(0) + "%";
    document.getElementById("progress_1").style.width = p.toFixed(0) + "%";
    document.getElementById("progress_2").style.width = p.toFixed(0) + "%";
    document.getElementById("progress_3").style.width = p.toFixed(0) + "%";
    document.getElementById("progress_4").style.width = p.toFixed(0) + "%";
    document.getElementById("progress_5").style.width = p.toFixed(0) + "%";
}

/**
 * Onclick -> index += 20
 *            offset += 20  
 *            loadAllPokemonData();
 */

function templatePokeIndex(i) {
    return /*html*/`
        <div id="overview" class="cursor" onclick="openPokeDetail(${i})">
                <div class="overview-description">
                    <div class="overview-seperate justify">
                        <div class="overview-name">${allPokeArray[i].name}</div>
                        <div class="overview-id">${allPokeArray[i].id}#</div>
                    </div>
                    <div class="overview-seperate">
                        <div>${templateTypes(i)}</div>
                        <img id="overviewAvatar" src="${allPokeArray[i].sprites.other.dream_world.front_default}">
                    </div>
                </div>
            </div> `;
}

function templateTypes(i) {
    let htmlCode = "";
    for (let j = 0; j < allPokeArray[i].types.length; j++) {
        const typesValue = allPokeArray[i].types[j];
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
                <div class="pokemon-type"><!--PLACEHOLDERTYPES--></div>
            </div>
            <img id="pokemonAvatar" src="${detailValue.sprites.other.dream_world.front_default}">
        </div>
        <div class="info-pokemon">
            <div class="info-navigation">
                <a href="#">Base Stats</a>
                <a href="#">About</a>
            </div>
            <div class="poke-description">

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