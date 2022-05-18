let url = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonArray = [];


async function loadAPIPokemon() {
    for (let i = 0; i < 50; i++) {
        const pokemonUrl = url + (i + 1);
        let response = await fetch(pokemonUrl);
        let responseAsJSON = await response.json();
        pokemonArray.push(responseAsJSON);
    }
    renderAllPokemon()
}


function renderAllPokemon() {
    document.getElementById('allPokemon').innerHTML = '';
    renderPokemonCards();
    renderPokemonAttributes();
}


function renderPokemonCards() {
    for (let i = 0; i < pokemonArray.length; i++) {
        templatePokemonCard(i);
    }
}


function templatePokemonCard(i){
    let pokemon = pokemonArray[i];
    document.getElementById('allPokemon').innerHTML +=/*html*/ `
    <div onclick="showPokemonCard(${i})" class="pokemonCard bg-${pokemon['types'][0]['type']['name']}">
        <div class="pokemonCardTitle">
        <div class="pokemonCardName">${pokemon['name']}</div>
        <div class="pokemonCardElements">
            <div class="pokemonCardAttributes" id="pokemonCardAttributes(${i})"></div>
            <img class="pokeCardImg" src="${pokemon['sprites']['other']['dream_world']['front_default']}">
        <div>
    </div>
    `;
}


function renderPokemonAttributes() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const pokemon = pokemonArray[i];
        let pokemonAttribute = document.getElementById(`pokemonCardAttributes(${i})`);

        for (let j = 0; j < pokemon['types'].length; j++) {
            const attribute = pokemon['types'][j]['type']['name'];
            pokemonAttribute.innerHTML +=/*html*/ `<div class="pokemonCardSingleAttribute">${attribute}</div>`;
        }
    }
}


function showPokemonCard(i) {
    document.getElementById('pokedexContainer').classList.remove('d-none');
    document.getElementById('allPokemon').classList.add('d-opacity');
    renderPokemonCard(i);
}


function hidePokemonCard() {
    document.getElementById('pokedexContainer').classList.add('d-none');
    document.getElementById('allPokemon').classList.remove('d-opacity');
    cleanPokemonCardBackground();
}


function renderPokemonCard(i) {
    let pokemon = pokemonArray[i];

    document.getElementById('pokemonName').innerHTML = pokemon['name'];
    document.getElementById('pokemonHeader').classList.add(`bg-pc-${pokemon['types'][0]['type']['name']}`);
    document.getElementById('pokemonImg').src = pokemon['sprites']['other']['dream_world']['front_default'];
    renderPokemonCardStats(i);
}


function renderPokemonCardStats(i) {
    renderStat0(i);
    renderStat1(i);
    renderStat2(i);
    renderStat3(i);
    renderStat4(i);
    renderStat5(i);
}


function renderStat0(i){
    let pokemon = pokemonArray[i];
    document.getElementById('stat0').innerHTML = pokemon['stats'][0]['stat']['name'];
    document.getElementById('statValue0').innerHTML = pokemon['stats'][0]['base_stat'];
    checkPokemonCardBackgroundColor(pokemon['stats'][0]['base_stat'], 'statValue0');
}


function renderStat1(i){
    let pokemon = pokemonArray[i];
    document.getElementById('stat1').innerHTML = pokemon['stats'][1]['stat']['name'];
    document.getElementById('statValue1').innerHTML = pokemon['stats'][1]['base_stat'];
    checkPokemonCardBackgroundColor(pokemon['stats'][1]['base_stat'], 'statValue1');
}
    

function renderStat2(i){
    let pokemon = pokemonArray[i];
    document.getElementById('stat2').innerHTML = pokemon['stats'][2]['stat']['name'];
    document.getElementById('statValue2').innerHTML = pokemon['stats'][2]['base_stat'];
    checkPokemonCardBackgroundColor(pokemon['stats'][2]['base_stat'], 'statValue2');
}


function renderStat3(i){
    let pokemon = pokemonArray[i];
    document.getElementById('stat3').innerHTML = pokemon['stats'][3]['stat']['name'];
    document.getElementById('statValue3').innerHTML = pokemon['stats'][3]['base_stat'];
    checkPokemonCardBackgroundColor(pokemon['stats'][3]['base_stat'], 'statValue3');
}


function renderStat4(i){
    let pokemon = pokemonArray[i];
    document.getElementById('stat4').innerHTML = pokemon['stats'][4]['stat']['name'];
    document.getElementById('statValue4').innerHTML = pokemon['stats'][4]['base_stat'];
    checkPokemonCardBackgroundColor(pokemon['stats'][4]['base_stat'], 'statValue4');
}


function renderStat5(i){
    let pokemon = pokemonArray[i];
    document.getElementById('stat5').innerHTML = pokemon['stats'][5]['stat']['name'];
    document.getElementById('statValue5').innerHTML = pokemon['stats'][5]['base_stat'];
    checkPokemonCardBackgroundColor(pokemon['stats'][5]['base_stat'], 'statValue5');
}


function checkPokemonCardBackgroundColor(number, id) {
    let value = number;
    let adress = id;
    if (value >= 50) {
        document.getElementById(adress).style = `width: ${number}%; background-color:green;`;
    }
    else {
        document.getElementById(adress).style = `width: ${number}%; background-color:red;`;
    }
}


function cleanPokemonCardBackground() {
    document.getElementById('pokemonHeader').classList.remove('bg-pc-grass');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-fire');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-water');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-bug');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-normal');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-poison');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-electric');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-ground');
    document.getElementById('pokemonHeader').classList.remove('bg-pc-fairy');
}


function favoritePokemon() {
    if (document.getElementById('favorite').src = './img/favorite_border_white_24dp.svg') {
        document.getElementById('favorite').src = './img/favorite_white_24dp.svg';
        renderPokemonCard();
    }
}


function searchPokemon() {
    let search = document.getElementById('pokemonSearch').value;
    search = search.toLowerCase();
    document.getElementById('allPokemon').innerHTML = '';
    
    for (let i = 0; i < pokemonArray.length; i++) {
        if (pokemonArray[i]['name'].toLowerCase().includes(search)) {
            templateSearchPokemon(i);   
        }
    }
}


function templateSearchPokemon(i){
    document.getElementById('allPokemon').innerHTML += /*html */`
            <div onclick="showPokemonCard(${i})" class="pokemonCard bg-${pokemonArray[i]['types'][0]['type']['name']}">
            <div class="pokemonCardTitle">
            <div class="pokemonCardName">${pokemonArray[i]['name']}</div>
            <div class="pokemonCardElements">
                <div class="pokemonCardAttributes" id="pokemonCardAttributes(${i})"></div>
                <img class="pokeCardImg" src="${pokemonArray[i]['sprites']['other']['dream_world']['front_default']}">
            <div>
        </div>
        `;
}