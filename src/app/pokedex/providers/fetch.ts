import type { PokeapiPkmn, PokeapiTypes, PokemonEntity } from "@/app/pokedex/interfaces/pokeapi";
import React from "react";

export const getPokemon = async (pokemonID: number, setPokemon: React.Dispatch<React.SetStateAction<PokemonEntity>>) => {

    const fetchPokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            .then((response) => {
                switch (response.status) {
                    case 404:
                        throw new Error("404");
                }
                return response.json();
            })
            .then(function (json: PokeapiPkmn) {
                const cleanData: PokemonEntity = {
                    id: json.id,
                    name: json.name,
                    height: json.height / 10,
                    weight: json.weight / 10,
                    types: formatTypes(json.types),
                    sprites: {
                        default : json.sprites.other["official-artwork"].front_default,
                        shiny: json.sprites.other["official-artwork"].front_shiny,
                    },
                }
                 return cleanData;
                //setPokemon(cleanData);
            })
            .catch((error) => {
                console.log('Catch ' + error);
            });

    const pokemonData = await fetchPokemon;

    if (pokemonData) {
        setPokemon(pokemonData);
    }

}

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
