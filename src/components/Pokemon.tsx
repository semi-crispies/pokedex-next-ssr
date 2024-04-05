'use server';

import Image from 'next/image'
import { getPokemon } from "@/services/fetch";
import React from "react";
import { capitalizeFirstLetter } from "@/services/utils";

type ID = {
    id: string,
};

export default async function Pokemon({id}: ID) {

    const pokemon = await getPokemon(id);

    return (
        <article>
            <Image src={pokemon.getSprite().dream}
                   width={200}
                   height={200}
                   alt={`Picture of ${pokemon.getName()}`}/>

            <h1>#{pokemon.getId()} - {capitalizeFirstLetter(pokemon.getName())}</h1>

            <div>{pokemon.getHeightMeter()} m</div>
            <div>{pokemon.getWeightKg()} kg</div>

            <ul>
                {(pokemon.getPokemonType()).map((type: string, index: React.Key) => {
                    return <li key={index}>{capitalizeFirstLetter(type)}</li>
                })}
            </ul>
        </article>
    )
}