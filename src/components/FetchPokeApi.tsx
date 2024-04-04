'use server';
async function getPokemon(id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    if (!res.ok) {
        throw new Error(`Error blablabla`)
    }

    return res.json();
}

export default async function FetchPokeApi() {

    const pokemon = await getPokemon("1");
    console.log(pokemon);

    return (
        <div>
            <div>FETCH POKEAPI</div>
            <h1>{pokemon.name}</h1>
        </div>
    )
}
