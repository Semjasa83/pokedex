let allPokeArray = [];
let allPokeData = [];
let offset = 10;
let index = 1;

async function loadPokemon() {
    for (let index= 1; index < offset; index++) {
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

/**
 * Onclick -> index += 20
 *            offset += 20  
 *            loadAllPokemonData();
 */


 function templatePokeIndex(i) {
    return /*html*/`
        <div id="overview" class="cursor" onclick="openPokeDetail()">
                <div class="overview-description">
                    <div class="overview-seperate justify">
                        <div class="overview-name">${allPokeArray[i].name}</div>
                        <div class="overview-id">${allPokeArray[i].id}#</div>
                    </div>
                    <div class="overview-seperate">
                        <div>TYPES</div>
                        <img id="overviewAvatar" src="">
                    </div>
                </div>
            </div> `;
}

/*
function templatePokeDetail(detailValue) {
    return`
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
}*/