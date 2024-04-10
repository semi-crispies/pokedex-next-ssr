export const getPokemon = (pokemonID: number, setPokemon: any) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            setPokemon(json);
        });