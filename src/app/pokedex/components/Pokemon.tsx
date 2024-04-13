'use client';

import Image from 'next/image'
import Type from "@/app/pokedex/components/Type";
import type {PokemonEntityData} from "@/app/pokedex/interfaces/pokeapi";
import React, {useState} from "react";
import Toggle from "@/components/Toggle";
import {skinHandler} from "@/services/utils";

export default function Pokemon(pokemon: PokemonEntityData) {

    const [checked, setChecked] = useState<boolean>(false);

    return (
        <article className="flex flex-col items-center w-72">

            <Toggle classList="self-end mb-4" iconName="sparkles" onClick={() => setChecked(!checked)}
                    checked={checked}/>

            <figure className="h-64 mb-14">
                <Image src={skinHandler(checked, pokemon)} width={500} height={0} priority
                       alt={`Picture of ${pokemon.pokemonData.name}`} style={{width: 'auto', height: '300px'}}/>
            </figure>

            <h1 className="w-full capitalize">
                #{pokemon.pokemonData.id.toString().padStart(3, '0')} - {pokemon.pokemonData.name}
            </h1>

            <div className="w-full flex flex-row-reverse gap-2">
                <span>{pokemon.pokemonData.height} m</span>
                <span>{pokemon.pokemonData.weight} kg</span>
            </div>

            <ul className="flex py-4 gap-4">
                {pokemon.pokemonData.types.map((type: string, index: React.Key) => {
                    return <li key={index}>
                        <Type text={type} classList={`w-24 capitalize ${type}`}/>
                    </li>
                })}
            </ul>

            <ul>
                {Object.entries(pokemon.pokemonData.evolution).map((phase: any, index: React.Key) => {
                    return <li className="capitalize" key={index}>{phase[1]}</li>
                })}
            </ul>

        </article>
    )
}
