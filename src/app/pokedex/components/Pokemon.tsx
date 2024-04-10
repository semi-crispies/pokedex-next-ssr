'use client';

import Image from 'next/image'
import React from "react";
import {capitalizeFirstLetter} from "@/services/utils";
import Type from "@/app/pokedex/components/Type";
import {PokemonEntityData} from "@/app/pokedex/interfaces/pokeapi";

export default function Pokemon(pokemon: PokemonEntityData) {
    return (
        <article className="flex flex-col items-center w-72">
            <figure className="h-40">
                <Image src={pokemon.pokemonData.sprites} width={200} height={200}
                       alt={`Picture of ${pokemon.pokemonData.name}`}/>
            </figure>

            <h1 className="w-full">
                #{pokemon.pokemonData.id.toString().padStart(3, '0')} - {capitalizeFirstLetter((pokemon.pokemonData.name))}
            </h1>

            <div className="w-full flex flex-row-reverse gap-2">
                <span>{pokemon.pokemonData.height} m</span>
                <span>{pokemon.pokemonData.weight} kg</span>
            </div>

            <ul className="flex py-4 gap-4">
                {pokemon.pokemonData.types.map((type: string, index: React.Key) => {
                    return <li key={index}>
                        <Type text={capitalizeFirstLetter(type)} classList={`w-24 ${type}`}/>
                    </li>
                })}
            </ul>
        </article>
    )
}
