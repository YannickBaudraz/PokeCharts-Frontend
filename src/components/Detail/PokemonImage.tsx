import { Image } from 'primereact/image';
import Pokemon from '../../models/Pokemon';

interface PokemonImageProps {
    pokemon:Pokemon
}

export default function PokemonImage( {pokemon}:PokemonImageProps) {

    const pokemonImage = () => {
        if (pokemon.id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }
        return ''
    }
     return (
        <Image src={pokemonImage()} alt={pokemon?.name} width="250" preview /> 
     )
}

