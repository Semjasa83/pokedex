let currentPokemon;
let previousNumber = 0;
let currentNumber = 20;
let pokemonNames = [];
let pokemonId = [];


// help function //
function getID(id) {
    return document.getElementById(id);
}
// **************** //

// load more Pokemon //
function loadMorePokemon() {
    currentNumber += 20;
    previousNumber += 20;
    loadPokemon();
}
// **************** //

// load Pokemon from api // 
async function loadPokemon() {
    for (let i = previousNumber + 1; i <= currentNumber; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        renderCard(i);
    }
    nametoArray();

}
// **************** //

// render small cards //  
function renderCard(i) {
    getID('pokemon-cards').innerHTML += templatePokemonCard(i);
    types(i);
}
// template for the small cards // 
function templatePokemonCard(i) {
    return `
    <div class="small-card hover flex-colum border-radius box-shadow" onclick="bigCard(${i})" style="background-color: var(--bg-${currentPokemon['types'][0]['type']['name']});">
        <span># ${i}</span>
        <h2 class="name">${currentPokemon['name']}</h2>
        <div class="type-img">
            <div class="type flex-colum" id="types${i}">
            </div>
            <img class="card-img" src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="picture of ${currentPokemon['name']}">
        </div>
    </div>
    `;
}
// **************** //

// load types and show the types //
function types(i) {
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        if (getID('big').classList.contains('d-none') == true) {
            getID(`types${i}`).innerHTML += `<span class="border-radius">${currentPokemon['types'][j]['type']['name']}</span>`;
        } else {
            getID(`big-types${i}`).innerHTML += `<span class="border-radius">${currentPokemon['types'][j]['type']['name']}</span>`;
        }

    }
}
// **************** //

// render big cards //
async function bigCard(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    getID('big').classList.remove('d-none');
    getID('card-head').innerHTML = templateBigCardHead(i);
    getID('card-container').style.backgroundColor = `var(--bg-${currentPokemon['types'][0]['type']['name']}`;
    getID('about').classList.add('active');
    types(i);
    showStats();
    showAbout();
}

function templateBigCardHead(i) {
    return `
    <div class="small-card flex-colum border-radius" style="background-color: var(--bg-${currentPokemon['types'][0]['type']['name']});">
        <span># ${currentPokemon['id']}</span>
        <h2 class="name">${currentPokemon['name']}</h2>
        <div class="type-img">
            <div class="type flex-colum" id="big-types${i}">
            </div>
            <img class="card-img" src="${currentPokemon['sprites']['other']['home']['front_default']}" alt="picture of ${currentPokemon['name']}">
        </div>
    </div>
    `;
}
// **************** //

// Activate About or Stats //
function showInfo() {
    if (getID('table-stats').classList.contains('d-none') == true) {
        getID('table-about').classList.add('d-none');
        getID('table-stats').classList.remove('d-none');
        getID('about').classList.remove('active');
        getID('stats').classList.add('active');

    } else {
        getID('table-about').classList.remove('d-none');
        getID('table-stats').classList.add('d-none');
        getID('about').classList.add('active');
        getID('stats').classList.remove('active');
    }
}
// **************** //

// show the id, height and weight form api //
function showAbout() {
    getID('id').innerHTML = '# ' + currentPokemon['id'];
    getID('height').innerHTML = currentPokemon['height'] * 10 + ' cm';
    getID('weight').innerHTML = currentPokemon['weight'] / 10 + ' kg';
    showAbilities();

}
// **************** //

// render the list of abilities
function showAbilities() {
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let ul = document.getElementById("list");
        let li = document.createElement("li");
        ul.appendChild(li);
        li.setAttribute('id', `abilities${i}`);
        getID(`abilities${i}`).innerHTML = currentPokemon['abilities'][i]['ability']['name'];
    }
}
// **************** //

// render the stats //
function showStats() {
    getID('hp').value = currentPokemon['stats'][0]['base_stat'];
    getID('attack').value = currentPokemon['stats'][1]['base_stat'];
    getID('defense').value = currentPokemon['stats'][2]['base_stat'];
    getID('special-attack').value = currentPokemon['stats'][3]['base_stat'];
    getID('special-defense').value = currentPokemon['stats'][4]['base_stat'];
    getID('speed').value = currentPokemon['stats'][5]['base_stat'];
    percentNumbers();
}
// **************** //

// shows the progress bar in percent //
function percentNumbers() {
    getID('hp-num').innerHTML = currentPokemon['stats'][0]['base_stat'] + '%';
    getID('attack-num').innerHTML = currentPokemon['stats'][1]['base_stat'] + '%';
    getID('defense-num').innerHTML = currentPokemon['stats'][2]['base_stat'] + '%';
    getID('spa-num').innerHTML = currentPokemon['stats'][3]['base_stat'] + '%';
    getID('spd-num').innerHTML = currentPokemon['stats'][4]['base_stat'] + '%';
    getID('speed-num').innerHTML = currentPokemon['stats'][5]['base_stat'] + '%';
}
// **************** //

// close the big card // 
function closeBigCard() {
    getID('big').classList.add('d-none');
    getID('list').innerHTML = '';
    getID('table-about').classList.remove('d-none');
    getID('table-stats').classList.add('d-none');
    getID('stats').classList.remove('active');
}
// **************** //

// search function
// *checks if the id is under 898
// *checks whether the input from the input field is present in the array Pokemon Name and PokemonId 
//  if the input is not in the array, you get an alert
//  if the input is in the array, the big card is displayed
//  and finally the input field is emptied
function searchPokemon() {
    if (getID('input').value >= 899) {
        alert('id not over 898 please');
    } else {
        if (pokemonNames.indexOf(getID('input').value.toLowerCase()) == -1 && pokemonId.indexOf(getID('input').value) == -1) {
            alert('Pokemon full name please or ID ');
            console.log(getID('input').value);
        } else {
            let pokemonName = getID('input').value.toLowerCase();
            bigCard(pokemonName);
        }
    }

    getID('input').value = '';
}
// **************** //

// loads the Pokemon names form the API and push the names in the array PokemonNames // 
async function nametoArray() {
    let input = getID('input').value;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    let response = await fetch(url);
    let pokemons = await response.json();
    for (let i = 0; i < pokemons['results'].length; i++) {
        pokemonNames.push(pokemons['results'][i]['name']);
        let j = i + 1;
        let num = j.toString();
        pokemonId.push(num);
    }
}
// **************** //

// When you press Enter in the input field, the searchPokemon function is loaded // 
function keydown(e) {
    if (e.keyCode == 13) {
        searchPokemon();
    }
}
// **************** //