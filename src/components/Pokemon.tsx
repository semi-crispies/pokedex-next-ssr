'use server';
import Image from 'next/image'
import {getPokemon} from "../../services/fetch";
import React from "react";

export default async function Pokemon() {

    const pokemon = await getPokemon("158");
    console.log(pokemon);

    return (
        <article>
            <Image src={pokemon.sprite}
                   width={200}
                   height={200}
                   alt={`Picture of ${pokemon.name}`}/>

            <h1>{pokemon.name}</h1>

            <ul>
                {(pokemon.types).map((type: string, index: React.Key) => {
                    return <li key={index}>{type}</li>
                })}
            </ul>
        </article>
    )
}
