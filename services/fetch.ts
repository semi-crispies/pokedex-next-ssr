import Pokemon from "./Pokemon";

export async function getPokemon(id: string) {
    const res: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await res.json();

    if (!res.ok) {
        throw new Error(`Error blablabla`)
    }

    const pokemon = new Pokemon(json);

    return {
        id: json.id,
        name: pokemon.getName(),
        height: pokemon.getHeight(),
        weight: pokemon.getWeight(),
        sprite: pokemon.getSprite('dream'),
        types: pokemon.getPokemonType(),
    };
}
