import { Image } from 'primereact/image';
import Pokemon from '../../models/Pokemon';

interface ImageProps {
    pokemon:Pokemon
}

export default function DisplayImage({pokemon}:ImageProps) {
    const pokemonImage = () => {
        if (pokemon.id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }
        return ''
    }
     return (
        <Image src={pokemonImage()} alt={pokemon?.name} width="500" preview /> 
     )
}

