import Image from "next/image";
import React from "react";
import type {PokemonEvolutionItemParams} from "@/app/pokedex/interfaces/pokeapi";

export default function PokemonTeaser(pokemonParams: PokemonEvolutionItemParams) {

    const pokemon = pokemonParams.pokemonEvolutionData;

    return (
        <>
            {
                pokemon.id !== 0 ?
                    <article className="flex flex-col items-center">
                        <span>#{pokemon.id.toString().padStart(3, '0')}</span>

                        <Image src={pokemon.sprite}
                               alt={`Picture of ${pokemon.name}`}
                               width={50} height={0} style={{width: 'auto', height: '30px'}}/>

                        <div className="capitalize">{pokemon.name}</div>
                    </article>
                    : <></>
            }
        </>
    )
}