import {PokeapiPkmn, PokeapiTypes, PokemonEntity} from "@/app/pokedex/interfaces/pokeapi";

export const getPokemon = (pokemonID: number, setPokemon: any) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json: PokeapiPkmn) {
            const cleanData: PokemonEntity = {
                id: json.id,
                name: json.name,
                height: json.height / 10,
                weight: json.weight / 10,
                types: formatTypes(json.types),
                sprites: json.sprites.other.dream_world.front_default,
            }
            setPokemon(cleanData);
        });

function formatTypes(rawTypes: PokeapiTypes[]): string[] {
    const cleanTypes: string[] = [];
    for (const rawType of rawTypes) {
        cleanTypes.push(rawType.type.name);
    }
    return cleanTypes;
}
