let allPokeArray = [];
let savedAllPokeArray = [];
let offset = 298;
let l = 1;


//fetch the first Pokemons
async function loadPokemon() {
    for (let index = l; index <= offset; index++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
        let response = await fetch(url);
        allPokemon = await response.json();
        allPokeArray.push(allPokemon);
    }
    l += 298;
    console.log(allPokeArray);
    savedAllPokeArray = allPokeArray;
    loadPokeIndex();
}

//load the first Pokemons by Template
async function loadPokeIndex() {
    document.getElementById('overviewContent').innerHTML = '';
    for (let i = 0; i < allPokeArray.length; i++) {
        document.getElementById('overviewContent').innerHTML +=
            templatePokeIndex(i);
    }
}

//push Amount of first Pokemons
function loadMorePokemon() {
    offset += 300;
    loadPokemon();
}

//opens the Details of specific Pokemon
function openPokeDetail(i) {
    let detailValue = allPokeArray[i];
    let overlay = document.getElementById('pokemonPopup');
    let noscroll = document.getElementById('bodyScroll');
    templateOpenPokeDetail(detailValue, overlay, i);
    overlay.classList.remove("d-none");
    noscroll.classList.add("noscrolling");
    statsCalc(detailValue);
}

//close the Detail Pokemon Popup
function closePokeDetail() {
    let closePopup = document.getElementById('pokemonPopup');
    let scroll = document.getElementById('bodyScroll');
    closePopup.classList.add("d-none");
    scroll.classList.remove("noscrolling");
}

//calculate the Stats of the specific Pokemon
function statsCalc(detailValue) {
    let sum = 0;
    for (let h = 0; h < detailValue.stats.length; h++) {
        let element = detailValue.stats[h];
        sum += detailValue.stats[h].base_stat;
        statsCalcProgressBar(element.base_stat, h);
    }
    document.getElementById("stats_total").innerHTML = sum;
}

//shows the Stats in Progressbars
function statsCalcProgressBar(element, k) {
    let w = element;
    let g = 255;
    let p = (w / g)* 100;
    templateProgressBar(p, k);
}

//render the Stats of specific Pokemon
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


//Input must be a valid Pokemon Name
async function searchPokemon() {
    let search = document.getElementById('searchinput').value;
    let pokeArray = [];
    const loadedPokemon = findPokemonByName(search);

    if(! loadedPokemon){
        const searchedPokemon = await fetchPokemonbyName(search);
    }
    if(document.getElementById('searchinput').value == search) {    
        allPokeArray = loadedPokemon;
        loadPokeIndex();
    }

}

function findPokemonByName(search){
    return allPokeArray.find(p => p.name == search);
}
/*
async function fetchPokemonbyName(name) {

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let response = await fetch(url);
        allPokemon = await response.json();
        return getPokemonbyName;
}
*/