'use client';

import Image from 'next/image'
import Type from "@/app/pokedex/components/Type";
import type {PokemonEntityData, PokemonEvolutionItem} from "@/app/pokedex/interfaces/pokeapi";
import React, {useState} from "react";
import Toggle from "@/components/Toggle";
import {skinHandler} from "@/services/utils";
import PokemonTeaser from "@/app/pokedex/components/PokemonTeaser";

export default function Pokemon(pokemon: PokemonEntityData) {

    const [checked, setChecked] = useState<boolean>(false);
    //console.log(pokemon.pokemonData.evolution.evo1);

    return (
        <article className="flex flex-col items-center w-96">

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

            <div>

                <div className="base">
                    <PokemonTeaser pokemonEvolutionData={pokemon.pokemonData.evolution.base}/>
                </div>

                <div className="evo1 flex flex-row gap-4 justify-center">
                    {(pokemon.pokemonData.evolution.evo1).map((evo: PokemonEvolutionItem, index: React.Key) => {
                        return (
                            <PokemonTeaser key={index} pokemonEvolutionData={evo}/>
                        )
                    })}
                </div>

            </div>

        </article>
    )
}
