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
                    evo1: [],
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

            // BASE
            const pokemonName = json.chain.species.name;
            const base: PokemonEvolutionItem = {
                id: 0,
                name: pokemonName,
                sprite: ""
            }
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then((response) => {
                    switch (response.status) {
                        case 404:
                            throw new Error("404");
                    }
                    return response.json();
                })
                .then((json: PokeapiPkmn) => {
                    base.id = json.id;
                    base.sprite = json.sprites.other.showdown.front_default;
                })
                .catch((error) => {
                    console.log(`Catch fetchPokemon : ${error}`);
                });

            // EVO1
            const evo1: PokemonEvolutionItem[] = [];
            for (const evo1ApiItem of json.chain.evolves_to) {
                const evo1Name = evo1ApiItem.species.name;
                const evo1data: PokemonEvolutionItem = {
                    id: 0,
                    name: evo1Name,
                    sprite: ""
                }
                fetch(`https://pokeapi.co/api/v2/pokemon/${evo1Name}`)
                    .then((response) => {
                        switch (response.status) {
                            case 404:
                                throw new Error("404");
                        }
                        return response.json();
                    })
                    .then((json: PokeapiPkmn) => {
                        evo1data.id = json.id;
                        evo1data.sprite = json.sprites.other.showdown.front_default;
                    })
                    .catch((error) => {
                        console.log(`Catch fetchPokemon : ${error}`);
                    });

                evo1.push(evo1data)
            }

            // EVO2

            return {
                base: base,
                evo1: evo1,
                evo2: json.chain.evolves_to[0]?.evolves_to[0]?.species.name,
            };

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
