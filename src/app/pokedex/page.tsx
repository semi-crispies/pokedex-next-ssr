'use client';

import Button from "@/components/Button";
import Pokemon from "@/app/pokedex/components/Pokemon";
import {useEffect, useState} from "react";
import {NextNumber, PreviousNumber} from "@/services/utils";
import {PokeapiPkmn, PokemonEntity} from "@/app/pokedex/interfaces/pokeapi";
import {getPokemon} from "@/app/pokedex/providers/fetch";

export default function Home() {

    const [pokemonID, setPokemonID] = useState<number>(1);
    const [pokemon, setPokemon] = useState<PokemonEntity>({
        height: 0, id: 0, name: "", sprites: "", types: [], weight: 0
    });

    useEffect(() => {
        getPokemon(pokemonID, setPokemon).then(r => r);
    }, [pokemonID]);

    return (
        <main className="flex flex-col items-center justify-center py-8">

            {pokemon.id !== 0 ? <Pokemon pokemonData={pokemon}/> : null}

            <div>Pokemon ID : {pokemonID}</div>

            <div className="flex space-x-24">
                <Button label={"Previous"} classList="bg-gray-300 hover:bg-gray-600 hover:text-white"
                        onClick={() => PreviousNumber(pokemonID, setPokemonID)}/>
                <Button label={"Next"} classList="bg-gray-300 hover:bg-gray-600 hover:text-white"
                        onClick={() => NextNumber(pokemonID, setPokemonID)}/>
            </div>

        </main>
    )
}
