'use client';

import Image from 'next/image'
import Type from "@/app/pokedex/components/Type";
import type {PokemonEntityData, PokemonEvolution} from "@/app/pokedex/interfaces/pokeapi";
import React, {useState} from "react";
import Toggle from "@/components/Toggle";
import {skinHandler} from "@/services/utils";
import PokemonTeaser from "@/app/pokedex/components/PokemonTeaser";

export default function Pokemon(pokemon: PokemonEntityData) {

    const [checked, setChecked] = useState<boolean>(false);

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

            <div className="evolution-tree">

                <PokemonTeaser pokemonEvolutionData={pokemon.pokemonData.evolution}/>

                {pokemon.pokemonData.evolution.evolveTo.length !== 0 ?

                    <div className="flex flex-row gap-4 justify-center">

                        {pokemon.pokemonData.evolution.evolveTo.map((evo: PokemonEvolution, index: React.Key) => (
                            <div key={index} className={`${evo.name}`}>

                                <PokemonTeaser pokemonEvolutionData={evo}/>

                                {evo.evolveTo.length !== 0 ?
                                    <div className="flex flex-row gap-4 justify-center">
                                        {evo.evolveTo.map((innerEvo: PokemonEvolution, innerIndex: React.Key) => (
                                            <div key={innerIndex} className={`${innerEvo.name}`}>
                                                <PokemonTeaser pokemonEvolutionData={innerEvo}/>
                                            </div>
                                        ))}
                                    </div> : <></>}

                            </div>
                        ))}

                    </div> : <></>}

            </div>

        </article>
    )
}
