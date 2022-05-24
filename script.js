let allPokeArray = [];
let allPokeData = [];
let offset = 10;
let index = 1;

/**
 * use INDEX only for loadPokemon(), otherwise errors will occur
 */

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

function loadMorePokemon() {
    offset += 10;
    loadPokemon(offset);
}

function openPokeDetail(i) {
    let detailValue = allPokeArray[i];
    let overlay = document.getElementById('pokemonPopup');
    let noscroll = document.getElementById('bodyScroll');
    templateOpenPokeDetail(detailValue, overlay, i);
    overlay.classList.remove("d-none");
    noscroll.classList.add("noscrolling");
    statsCalc(detailValue);
    console.log(detailValue);
}


function closePokeDetail() {
    let closePopup = document.getElementById('pokemonPopup');
    let scroll = document.getElementById('bodyScroll');
    closePopup.classList.add("d-none");
    scroll.classList.remove("noscrolling");
}


function statsCalc(detailValue) {
    let sum = 0;
    for (let h = 0; h < detailValue.stats.length; h++) {
        let element = detailValue.stats[h];
        sum += detailValue.stats[h].base_stat;
        statsCalcProgressBar(element.base_stat, h);
    }
    document.getElementById("stats_total").innerHTML = sum;
}


function statsCalcProgressBar(element, k) {
    let w = element;
    let g = 255;
    let p = (w / g)* 100;
    templateProgressBar(p, k);
}


function templateProgressBar(p, k) {
    document.getElementById(`progress_${k}`).style.width = p.toFixed(0) + "%";
}


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

function showStats(stats) {
    let titles = ['HP','Attack','Defense','Sp.Atk','Sp.Def','Speed',]
    let htmlCode = "";
    for (let i = 0; i < titles.length; i++) {
        htmlCode += `<tr>
                        <td>${titles[i]}</td>
                        <td id="stats_0" class="align">${stats[i].base_stat}</td>
                        <td class="progress"><span id="progress_${i}" class="progress-bar" style="width: 75%"></span></td>
                    </tr>`;
    }
    return htmlCode;
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


function templateOpenPokeDetail(detailValue, overlay, i) {
    overlay.innerHTML = '';
    overlay.innerHTML += `
    <div id="pokemonSingleBgr">
    <div id="pokemonSingleContainer">${templatePokeDetail(detailValue, i)}</div>
    </div>`;
}


function templatePokeDetail(detailValue, i) {
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
                <div class="pokemon-type">${templateTypes(i)}</div>
            </div>
            <img id="pokemonAvatar" src="${detailValue.sprites.other.dream_world.front_default}">
        </div>
        <div class="info-pokemon">
            <div class="info-navigation">
                <span class="info-nav-head">Base Stats</span>
            </div>
            <div class="info-base-stats">
                <table class="info-stats-values">
                    ${showStats(detailValue.stats)}
                    <tr>
                        <td>Total</td>
                        <td id="stats_total"></td>
                        <td class="noprogress"></td>
                    </tr>
                    
                </table>
            </div>
            <div class="info-poke-description">
                <div class="attributes">
                    <span class="mrg-lft">Weight:</span>
                    <span>${detailValue.height}</span>
                </div>    
                <div class="attributes">
                    <span class="mrg-lft">Height:</span>
                    <span>${detailValue.weight}</span>
                </div>    
            </div>
        </div>
    `
}

