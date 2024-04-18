import type {
    PokeapiPkmn,
    PokeapiTypes,
    PokemonEntity,
    PokemonEvolution,
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
                    id: 0,
                    name: "",
                    sprite: "",
                    evolveTo: [],
                }
            }
            return cleanData;
        })
        .catch((error) => {
            console.log(`Catch fetchPokemon : ${error}`);
        });

    const pokemonData = await fetchPokemon;
    const pokemonEvolution = await getPokemonEvolutionFromAPI(pokemonID);

    //console.log(pokemonEvolution?.id);
    //console.log(pokemonEvolution?.name)

    // if (pokemonEvolution) {
    //     console.log(pokemonEvolution?.name);
    // } else {
    //     console.log("Evolution NOT LOADED")
    // }

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

const evolutionChainURL = async (pokemonID: number): Promise<string | any> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`);
        switch (response.status) {
            case 404:
                throw new Error("404");
        }
        const json = await response.json();
        return json.evolution_chain.url;
    } catch (error) {
        console.log(`Catch fetchSpecies : ${error}`);
    }
}

// const getPokemonInfoByName = async (pokemonName: string) => {
//     try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//
//         switch (response.status) {
//             case 404:
//                 throw new Error("404");
//         }
//         const json: Promise<Partial<PokemonEvolution>> = response.json();
//
//         return {
//             id: json.id,
//             //sprite: json.sprites.other.showdown.front_default,
//         }
//     } catch (error) {
//         console.log(`Catch fetchPokemon : ${error}`);
//     }
// }

async function getPokemonEvolutionFromAPI(pokemonID: number) {

    const evolutionTree: PokemonEvolution = {
        id: 0,
        name: "",
        sprite: "",
        evolveTo: [],
    }

    return fetch(await evolutionChainURL(pokemonID))
        .then((response) => {
            switch (response.status) {
                case 404:
                    throw new Error("404");
            }
            return response.json();
        })
        .then((json) => {

            // BASE
            evolutionTree.name = json.chain.species.name;

            fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionTree.name}`)
                .then((response) => {
                    switch (response.status) {
                        case 404:
                            throw new Error("404");
                    }
                    return response.json();
                })
                .then((json: PokeapiPkmn) => {
                    evolutionTree.id = json.id;
                    evolutionTree.sprite = json.sprites.other.showdown.front_default;
                })
                .catch((error) => {
                    console.log(`Catch fetchPokemon : ${error}`);
                });

            // EVO
            for (const evoApiItem of json.chain.evolves_to) {
                const evoData: PokemonEvolution = {
                    id: 0,
                    name: evoApiItem.species.name,
                    sprite: "",
                    evolveTo: [],
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

                        for (const nestedApiEvo of evoApiItem.evolves_to) {
                            const nestedEvo: PokemonEvolution = {
                                id: 0,
                                name: "",
                                sprite: "",
                                evolveTo: [],
                            }

                            nestedEvo.name = nestedApiEvo.species.name;

                            fetch(`https://pokeapi.co/api/v2/pokemon/${nestedEvo.name}`)
                                .then((response) => {
                                    switch (response.status) {
                                        case 404:
                                            throw new Error("404");
                                    }
                                    return response.json();
                                })
                                .then((json: PokeapiPkmn) => {
                                    nestedEvo.id = json.id;
                                    nestedEvo.sprite = json.sprites.other.showdown.front_default ? json.sprites.other.showdown.front_default : json.sprites.other["official-artwork"].front_default;
                                })
                                .catch((error) => {
                                    console.log(`Catch fetchPokemon : ${error}`);
                                });
                            evoData.evolveTo.push(nestedEvo);
                        }

                    })
                    .catch((error) => {
                        console.log(`Catch fetchPokemon : ${error}`);
                    });

                evolutionTree.evolveTo.push(evoData);
            }
            return evolutionTree
        })
        .catch((error) => {
            console.log(`Catch fetchEvolution : ${error}`);
        })

    //return evolutionTree;
}
