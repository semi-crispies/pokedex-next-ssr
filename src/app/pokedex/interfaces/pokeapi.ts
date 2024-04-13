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
}

export type PokemonEntityData = {
    pokemonData: PokemonEntity
}