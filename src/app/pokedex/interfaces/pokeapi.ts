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
        front_default: string,
        other: {
            dream_world: {
                front_default: string
            },
            home: {
                front_shiny: string
            }
        },
    }
}

export type PokeapiPkmnData = {
    pokemonData: PokeapiPkmn
}