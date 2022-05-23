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
    overlay.innerHTML = templateOpenPokeDetail(detailValue);
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
        statsCalcProgressBar(element.base_stat, sum, y);
    }
    returnSum(sum);
}
function returnSum(sum) {
    document.getElementById("stats_total").innerHTML = sum;
}
function statsCalcProgressBar(element, sum, index) {
    let w = element;
    let g = sum;
    let p = (w / g)* 100;
    templateProgressBar(p, index);
    console.log(p);
}
function templateProgressBar(p , index) {
    document.getElementById(`progress_${index}`).style.width = p.toFixed(0) + "%";
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
function templateOpenPokeDetail(detailValue) {
   return `
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
                    ${bla(detailValue.stats)}
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
function bla(stats) {
    let titles = ['HP','Attack','Defense','Sp.Atk','Sp.Def','Speed',]
    let htmlCode = "";
    for (let i = 0; i < titles.length; i++) {
        htmlCode += `<tr>
                        <td>${titles[i]}</td>
                        <td id="stats_0">${stats[i].base_stat}</td>
                        <td class="progress"><span id="progress_0" class="progress-bar" style="width: 75%"></span></td>
                    </tr>`;
    }
    return htmlCode;
}