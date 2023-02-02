
import { useState } from 'react';
import { Image } from 'primereact/image';


export default function PokemonStateInfo( {pokemon}) {

    const pokemonImage = () => {
        if (pokemon?.id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
        }
        return ''
    }
     return (
        <Image src={pokemonImage()} alt={pokemon?.name} width="250" preview /> 
     )
}

