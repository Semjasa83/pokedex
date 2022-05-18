// ICH MUSS MUSS NOCH DEN BUTTON ZUM POKEDEX GESTALTEN UND SONST EIN PAAR KLEINIGKEITEN; DENN DAS IST EIN PREOJEKT FÜRS PORTFOLIO

let currentPokemon;
let pokedexBox;

async function loadPokemonBoxes() {
    displayNone();
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1126';
    let response = await fetch(url);
    pokedexBox = await response.json();
    // console.log('loaded pokemonBoxes', pokedexBox);

    renderPokemonBoxes();
}

async function renderPokemonBoxes() {
    document.getElementById('pokedexBoxes').innerHTML = '';
    // let count = pokedexBox['count'];
    for (let i = 0; i < 150; i++) {
        let name = pokedexBox['results'][i]['name'];
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        // console.log('loaded pokemon', currentPokemon);
        document.getElementById('pokedexBoxes').innerHTML += generatePokemonBox(name);
    }
}

function generatePokemonBox(name) {
    return /*html*/ `
        <div onclick="loadPokemon('${name}')" class="pokemonBoxContainer">
            <img src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="">
            <span>${name.charAt(0).toUpperCase() + name.slice(1)}</span>
        </div>
        `;
}

// ################################################################## POKEMON #####################################################################################
async function loadPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loaded pokemon', currentPokemon);

    displayNone();
    pokemonIndex();
    pokemonBodyCalc();
    generateBaseStats();
    renderPokemonInfo();
}

function displayNone() {
    let pokemonId = document.getElementById('pokemonContainer');
    let pokedexId = document.getElementById('pokedexBoxes');
    if (pokemonId.style.display == 'none') {
        pokedexId.style = ('display: none;');
        pokemonId.style = ('');
        document.getElementById('header').disabled = false;
    } else {
        pokedexId.style = ('');
        pokemonId.style = ('display: none;');
        document.getElementById('header').disabled = true;
    }
}

function renderPokemonInfo() {
    let name = currentPokemon['name'];
    document.getElementById('pokemonName').innerHTML = `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['home']['front_default'];
    generateTypes();
}

function generateTypes() {
    document.getElementById('pokemonType').innerHTML = '';
    let types = currentPokemon['types'];
    for (let i = 0; i < types.length; i++) {
        let typecolor = currentPokemon['types'][i]['type']['name'];
        document.getElementById('pokemonType').innerHTML += `<div id="typeColor${i}" class="typeContainer">${currentPokemon['types'][i]['type']['name']}</div>`;
        generateTypeColor(typecolor, i);
    }
}

let types = ['poison', 'grass', 'water', 'electric', 'flying', 'bug', 'rock', 'ghost', 'ice', 'fairy', 'normal', 'dragon', 'psychic', 'ground', 'fighting'];
let typesColor = ['background-color: rgb(219 0 192);', 'background-color: rgb(17 183 30);', 'background-color: rgb(55 59 211);', 'background-color: rgb(234 237 37); color: black;', 'background-color: rgb(129 192 237);', 'background-color: rgb(138 215 16);', 'background-color: rgb(151 122 86);', 'background-color: rgb(81 49 116);', 'background-color: rgb(74 189 183);', 'background-color: rgb(215 92 194);', 'background-color: rgb(165 155 155);', 'background-color: rgb(127 72 233);', 'background-color: rgb(211 39 126);', 'background-color: rgb(195 145 54);', 'background-color: rgb(122 34 20);']

function generateTypeColor(typecolor, i) {
    for (let a = 0; a < types.length; a++) {
        let type = types[a]
        if (typecolor == type) {
            document.getElementById('typeColor' + i).style = typesColor[a];
        }
    }
}

function pokemonBodyCalc() {
    let weight = currentPokemon['weight'] * 0.1;
    let height = currentPokemon['height'] * 0.1;
    document.getElementById('pokemonHeight').innerHTML = height.toFixed(1).replace('.', ',');
    document.getElementById('pokemonWeight').innerHTML = weight.toFixed(1).replace('.', ',');
}

function pokemonIndex() {
    let number = currentPokemon['id'];
    let formattedNumber = ("0" + "0" + number).slice(-3);
    document.getElementById('indexNumber').innerHTML = formattedNumber + '#';
}

function generateBaseStats() {
    generateHP();
    generateAtk();
    generateDef();
    generateSpeed();
}

function generateHP() {
    document.getElementById('hpSpan').innerHTML = currentPokemon['stats'][0]['base_stat'];
    let hp = generateWidth(currentPokemon['stats'][0]['base_stat']);
    document.getElementById('hpBar').style = `width: ${hp}%;`;
}

function generateAtk() {
    document.getElementById('atkSpan').innerHTML = currentPokemon['stats'][1]['base_stat'];
    let atk = generateWidth(currentPokemon['stats'][1]['base_stat']);
    document.getElementById('atkBar').style = `width: ${atk}%;`;

    document.getElementById('sAtkSpan').innerHTML = currentPokemon['stats'][3]['base_stat'];
    let sAtk = generateWidth(currentPokemon['stats'][3]['base_stat']);
    document.getElementById('sAtkBar').style = `width: ${sAtk}%;`;
}

function generateDef() {
    document.getElementById('defSpan').innerHTML = currentPokemon['stats'][2]['base_stat'];
    let def = generateWidth(currentPokemon['stats'][2]['base_stat']);
    document.getElementById('defBar').style = `width: ${def}%;`;

    document.getElementById('sDefSpan').innerHTML = currentPokemon['stats'][4]['base_stat'];
    let sDef = generateWidth(currentPokemon['stats'][4]['base_stat']);
    document.getElementById('sDefBar').style = `width: ${sDef}%;`;
}

function generateSpeed() {
    document.getElementById('speedSpan').innerHTML = currentPokemon['stats'][5]['base_stat'];
    let speed = generateWidth(currentPokemon['stats'][5]['base_stat']);
    document.getElementById('speedBar').style = `width: ${speed}%;`;
}

function generateWidth(i) {
    return i / 3;
}