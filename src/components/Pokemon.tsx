'use server';

import Image from 'next/image'
import {getPokemon} from "../../services/fetch";
import React from "react";
import {capitalizeFirstLetter} from "../../services/utils";

export default async function Pokemon() {

    const pokemon = await getPokemon("158");

    return (
        <article>
            <Image src={pokemon.sprite}
                   width={200}
                   height={200}
                   alt={`Picture of ${pokemon.name}`}/>

            <h1>#{pokemon.id} - {capitalizeFirstLetter(pokemon.name)}</h1>

            <div>{pokemon.height} m</div>
            <div>{pokemon.weight} kg</div>

            <ul>
                {(pokemon.types).map((type: string, index: React.Key) => {
                    return <li key={index}>{capitalizeFirstLetter(type)}</li>
                })}
            </ul>
        </article>
    )
}
