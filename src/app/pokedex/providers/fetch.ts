import type {PokeapiPkmn, PokeapiTypes, PokemonEntity, PokemonEvolution} from "@/app/pokedex/interfaces/pokeapi";
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
        .then((json: PokeapiPkmn) => {
            const cleanData: PokemonEntity = {
                id: json.id,
                name: json.name,
                height: json.height / 10,
                weight: json.weight / 10,
                types: formatTypes(json.types),
                sprites: {
                    default: json.sprites.other["official-artwork"].front_default,
                    shiny: json.sprites.other["official-artwork"].front_shiny,
                },
                evolution: {
                    base: "",
                    evo1: "",
                    evo2: ""
                }
            }
            return cleanData;
        })
        .catch((error) => {
            console.log(`Catch fetchPokemon : ${error}`);
        });

    const pokemonData = await fetchPokemon;

    const fetchSpecies = fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`)
        .then((response) => {
            switch (response.status) {
                case 404:
                    throw new Error("404");
            }
            return response.json();
        })
        .then((json) => {
            return json.evolution_chain.url;
        })
        .catch((error) => {
            console.log(`Catch fetchSpecies : ${error}`);
        })

    const fetchEvolution = fetch(await fetchSpecies)
        .then((response) => {
            switch (response.status) {
                case 404:
                    throw new Error("404");
            }
            return response.json();
        })
        .then((json) => {
            const evo: PokemonEvolution = {
                base: json.chain.species.name,
                evo1: json.chain.evolves_to[0]?.species.name,
                evo2: json.chain.evolves_to[0]?.evolves_to[0]?.species.name,
            };
            return evo;
        })
        .catch((error) => {
            console.log(`Catch fetchEvolution : ${error}`);
        })

    const pokemonEvolution = await fetchEvolution;

    if (pokemonData && pokemonEvolution) {
        pokemonData.evolution = pokemonEvolution;
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
