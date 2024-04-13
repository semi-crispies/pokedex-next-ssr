'use client';

import Button from "@/components/Button";
import Pokemon from "@/app/pokedex/components/Pokemon";
import {useCallback, useEffect, useState, KeyboardEvent} from "react";
import {PokemonEntity} from "@/app/pokedex/interfaces/pokeapi";
import {getPokemon, getPokemonBySearch} from "@/app/pokedex/providers/fetch";
import {nextNumber, previousNumber} from "@/services/utils";

export default function Home() {
    const [pokemonID, setPokemonID] = useState<number>(1);
    const [pokemon, setPokemon] = useState<PokemonEntity>({
        evolution: {
            base: "",
            evo1: "",
            evo2: ""
        }, height: 0, id: 0, name: "", sprites: {default: "", shiny: ""}, types: [], weight: 0

    });
    const [searchInput, setSearchInput] = useState<string>('Mew');

    const onChange = useCallback((input: any) => {
        setSearchInput(input.target.value)
    }, [searchInput])

    useEffect(() => {
        getPokemon(pokemonID, setPokemon).then(r => r);
    }, [pokemonID]);

    return (
        <main className="flex flex-col items-center justify-center">

            {pokemon.id !== 0 ? <Pokemon pokemonData={pokemon}/> : null}

            <div>Pokemon ID : {pokemonID}</div>

            <div className="flex space-x-24">
                <Button label="" classList="bg-gray-300 hover:bg-gray-600 hover:text-white"
                        onClick={() => previousNumber(pokemonID, setPokemonID, 1)} iconName="left"/>
                <Button label="" classList="bg-gray-300 hover:bg-gray-600 hover:text-white"
                        onClick={() => nextNumber(pokemonID, setPokemonID, 160)} iconName="right"/>
            </div>
            <div>
                <input placeholder='Mew' type='text' onChange={onChange}
                       onKeyDown={(event) => {
                           if (event.key === 'Enter') {
                               // handle error
                               getPokemonBySearch(searchInput)
                           }
                       }}/>
            </div>
        </main>
    )
}
