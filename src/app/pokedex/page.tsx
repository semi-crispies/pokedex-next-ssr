'use client';

import Image from "next/image";
import Button from "@/components/Button";
import Pokemon from "@/app/pokedex/components/Pokemon";
import {useEffect, useState} from "react";
import {NextNumber, PreviousNumber} from "@/services/utils";
import {PokeapiPkmn} from "@/app/pokedex/interfaces/pokeapi";

export default function Home() {

    const [pokemonID, setPokemonID] = useState(1);
    const [pokemon, setPokemon] = useState<PokeapiPkmn>({
        height: 0,
        id: 0,
        name: "",
        sprites: {front_default: "", other: {dream_world: {front_default: ""}, home: {front_shiny: ""}}},
        types: [],
        weight: 0
    });

    const getPokemon = (pokemonID: number) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                setPokemon(json);
            });

    useEffect(() => {
        getPokemon(pokemonID).then(r => r);
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
