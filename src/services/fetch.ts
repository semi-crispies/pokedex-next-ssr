import Pokemon from "../entity/Pokemon.class";

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

export async function getPokemon(id: string) {
    const res: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pkmnData: PokeapiPkmn = await res.json();

    if (!res.ok) {
        throw new Error(`Error blablabla`)
    }

    return new Pokemon(pkmnData);
}
