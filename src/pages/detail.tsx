
import { useState } from 'react';
import pokemons from '../data/pokemon.json'; 
import { ListBox } from 'primereact/listbox';
 
export default function Detail() {

    const [pokemon, setPokemon] = useState(null);

  function getPokemonName() {
    return pokemon ? pokemon[0].name : ''
    }

    
    return (
        <>
        <h1 className='pokemonTitle'>{getPokemonName()}</h1> 
                 
         <ListBox className='listbox' value={null} options={pokemons} onChange={(e) => setPokemon(e.value)} multiple filter optionLabel="name"
                 style={{ width: '15rem' }} listStyle={{ maxHeight: '250px' }} />


        </>
    );
}
