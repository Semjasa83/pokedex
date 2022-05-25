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


function templateTypes(i) {
    let htmlCode = "";
    for (let j = 0; j < allPokeArray[i].types.length; j++) {
        const typesValue = allPokeArray[i].types[j];
        htmlCode += /*html*/`
        <div id="typeColor" class="overview-type-container">
        <div id="overviewType">${typesValue.type['name']}</div>
        </div>`
        console.log(typesValue.type['name']);
        typesColor(typesValue.type['name']);
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
                    <span class="attr-spacer">Weight:</span>
                    <span>${detailValue.height}</span>
                </div>    
                <div class="attributes">
                    <span class="attr-spacer">Height:</span>
                    <span>${detailValue.weight}</span>
                </div>    
            </div>
        </div>
    `
}