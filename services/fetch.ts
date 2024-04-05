export async function getPokemon(id: string) {
    const res: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await res.json();

    if (!res.ok) {
        throw new Error(`Error blablabla`)
    }

    function getPokemonType(pokemon: object) {
        let types = [];
        // @ts-ignore
        for (const type of pokemon.types) {
            types.push(type.type.name);
        }

        return types;
    }

    return {
        id: json.id,
        name: json.name,
        height: json.height,
        weight: json.weight,
        sprite: json.sprites.other.dream_world.front_default,
        types: getPokemonType(json),
    };
}
