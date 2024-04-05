'use server';
import Image from 'next/image'
import {getPokemon} from "../../services/fetch";
import React from "react";

export default async function Pokemon() {

    const pokemon = await getPokemon("158");

    return (
        <article>
            <Image src={pokemon.sprite}
                   width={200}
                   height={200}
                   alt={`Picture of ${pokemon.name}`}/>

            <h1>{pokemon.id} {pokemon.name}</h1>

            <span>{pokemon.height}</span>
            <span>{pokemon.weight}</span>

            <ul>
                {(pokemon.types).map((type: string, index: React.Key) => {
                    return <li key={index}>{type}</li>
                })}
            </ul>
        </article>
    )
}
