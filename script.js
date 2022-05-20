let allPokeArray = [];
let allPokeData = [];
let offset = 0;

async function loadAllPokemonData() {
    for (let i = offset; i < offset; i++) {
        await loadPokemon(i);
    }
}

async function loadPokemon(i) {
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${i}&limit=40`; 
        let response = await fetch(url); 
        allPokemon = await response.json();
        allPokeArray.push(allPokemon);
        console.log(allPokeArray);
}

