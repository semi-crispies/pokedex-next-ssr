import type {
    PokeapiPkmn,
    PokeapiTypes,
    PokemonEntity,
    PokemonEvolution,
    PokemonEvolutionItem
} from "@/app/pokedex/interfaces/pokeapi";
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
                    base: {id: 0, name: "", sprite: ""},
                    evo: [],
                }
            }
            return cleanData;
        })
        .catch((error) => {
            console.log(`Catch fetchPokemon : ${error}`);
        });

    const pokemonData = await fetchPokemon;
    const pokemonEvolution = await getPokemonEvolutionFromAPI(pokemonID);

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

async function getPokemonEvolutionFromAPI(pokemonID: any): Promise<PokemonEvolution> {

    const evolution: PokemonEvolution = {
        base: {
            id: 0,
            name: "",
            sprite: ""
        },
        evo: [],
       }

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

    fetch(await fetchSpecies)
        .then((response) => {
            switch (response.status) {
                case 404:
                    throw new Error("404");
            }
            return response.json();
        })
        .then((json) => {

            // BASE
            const pokemonName = json.chain.species.name;
            evolution.base.name = pokemonName;

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then((response) => {
                    switch (response.status) {
                        case 404:
                            throw new Error("404");
                    }
                    return response.json();
                })
                .then((json: PokeapiPkmn) => {
                    evolution.base.id = json.id;
                    evolution.base.sprite = json.sprites.other.showdown.front_default;
                })
                .catch((error) => {
                    console.log(`Catch fetchPokemon : ${error}`);
                });

            // EVO
            for (const evoApiItem of json.chain.evolves_to) {
                const evoData: PokemonEvolutionItem = {
                    id: 0,
                    name: evoApiItem.species.name,
                    sprite: ""
                }
                fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.name}`)
                    .then((response) => {
                        switch (response.status) {
                            case 404:
                                throw new Error("404");
                        }
                        return response.json();
                    })
                    .then((json: PokeapiPkmn) => {
                        evoData.id = json.id;
                        evoData.sprite = json.sprites.other.showdown.front_default;
                    })
                    .catch((error) => {
                        console.log(`Catch fetchPokemon : ${error}`);
                    });

                evolution.evo.push(evoData)
            }

        })
        .catch((error) => {
            console.log(`Catch fetchEvolution : ${error}`);
        })

    return evolution;
}
