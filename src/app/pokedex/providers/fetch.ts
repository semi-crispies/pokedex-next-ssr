import { PokeapiPkmn, PokeapiTypes, PokemonEntity } from "@/app/pokedex/interfaces/pokeapi";
import React from "react";

export const getPokemon = (pokemonID: number, setPokemon: React.Dispatch<React.SetStateAction<PokemonEntity>>) =>
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

export const getPokemonBySearch = (input: string) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then((response) => {
            if (response.status === 404) {
                throw new Error(`Pokemon not found: ${input}`)
            }
            return response.json();
        });
}

function formatTypes(rawTypes: PokeapiTypes[]): string[] {
    const cleanTypes: string[] = [];
    for (const rawType of rawTypes) {
        cleanTypes.push(rawType.type.name);
    }
    return cleanTypes;
}
