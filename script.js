let allPokeArray = [];
let offset = 20;
let l = 1;

/**
 * use INDEX only for loadPokemon(), otherwise errors will occur
 */

async function loadPokemon() {
    for (let index = l; index <= offset; index++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(url);
        allPokemon = await response.json();
        allPokeArray.push(allPokemon);
    }
    l += 20;
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
    offset += 20;
    loadPokemon();
}
/*
function searchPokemon() {
    let search = document.getElementById('searchinput').ariaValueMax;
    search = search.toLowerCase();
}
*/
function openPokeDetail(i) {
    let detailValue = allPokeArray[i];
    let overlay = document.getElementById('pokemonPopup');
    let noscroll = document.getElementById('bodyScroll');
    templateOpenPokeDetail(detailValue, overlay, i);
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



