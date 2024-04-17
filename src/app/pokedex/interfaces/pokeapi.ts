import React from "react";

export type PokeapiTypes = {
    slot: number
    type: {
        name: string,
        url: string,
    }
}

export type PokeapiPkmn = {
    id: number,
    name: string,
    weight: number,
    height: number,
    types: PokeapiTypes[],
    sprites: {
        other: {
            'official-artwork': {
                front_default: string,
                front_shiny: string,
            },
            showdown: {
                front_default: string,
            }
        },
    }
}

export type PokemonEntity = {
    id: number,
    name: string,
    weight: number,
    height: number,
    types: string[],
    sprites: {
        default: string,
        shiny: string,
    },
    evolution: PokemonEvolution
}

export type PokemonEntityData = {
    pokemonData: PokemonEntity
}

export type PokemonEvolution = {
    id: number, name: string, sprite: string, evolveTo: PokemonEvolution[]
}

export type PokemonEvolutionParams = {
    pokemonEvolutionData: PokemonEvolution,
    key?: React.Key,
}