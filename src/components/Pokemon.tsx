'use server';

import Image from 'next/image'
import {getPokemon} from "@/services/fetch";
import React from "react";
import {applyTypeColor2, capitalizeFirstLetter} from "@/services/utils";
import Type from "@/components/Type";

type ID = {
    id: string,
}

function applyTypeColor1(type: string): string {

    switch (type) {
        case 'normal':
            return 'bg-normal-primary';
        case 'fighting':
            return 'bg-fighting-primary';
        case 'flying':
            return 'bg-flying-primary';
        case 'poison':
            return 'bg-poison-primary';
        case 'ground':
            return 'bg-ground-primary';
        case 'rock':
            return 'bg-rock-primary';
        case 'bug':
            return 'bg-bug-primary';
        case 'ghost':
            return 'bg-[#735797]';
        case 'steel':
            return 'bg-steel-primary';
        case 'fire':
            return 'bg-fire-primary';
        case 'water':
            return 'bg-water-primary';
        case 'grass':
            return 'bg-grass-primary';
        case 'electric':
            return 'bg-electric-primary';
        case 'psychic':
            return 'bg-psychic-primary';
        case 'ice':
            return 'bg-ice-primary';
        case 'dragon':
            return 'bg-dragon-primary';
        case 'dark':
            return 'bg-dark-primary'
        case 'fairy':
            return 'bg-fairy-primary';
        default:
            return "";
    }
}

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
                    return <li key={index}>
                        <Type text={capitalizeFirstLetter(type)} classList={applyTypeColor2(type)}/>
                    </li>
                })}
            </ul>
        </article>
    )
}
