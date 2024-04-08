'use server';

import Image from 'next/image'
import {getPokemon} from "@/services/fetch";
import React from "react";
import {capitalizeFirstLetter} from "@/services/utils";
import Type from "@/components/Type";

type ID = {
    id: string,
}

export default async function Pokemon({id}: ID) {

    const pokemon = await getPokemon(id);

    return (
        <article className="flex flex-col items-center w-72">
            <Image src={pokemon.getSprite().dream}
                   width={200} height={200}
                   alt={`Picture of ${pokemon.getName()}`}/>

            <h1 className="w-full">#{pokemon.getId()} - {capitalizeFirstLetter(pokemon.getName())}</h1>

            <div className="w-full flex flex-row-reverse gap-2">
                <span>{pokemon.getHeightMeter()} m</span>
                <span>{pokemon.getWeightKg()} kg</span>
            </div>

            <ul className="flex py-4 gap-4">
                {(pokemon.getPokemonType()).map((type: string, index: React.Key) => {
                    return <li key={index}>
                        <Type text={capitalizeFirstLetter(type)} classList={`w-24 ${type}`}/>
                    </li>
                })}
            </ul>
        </article>
    )
}
