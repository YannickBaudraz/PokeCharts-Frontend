
import { useState } from 'react';
import pokemons from '../data/pokemon.json'; 
import { ListBox } from 'primereact/listbox';
 
export default function Detail() {

    const [pokemon, setPokemon] = useState(null);

    
    return (
        <>
         <ListBox className='listbox' value={pokemon} options={pokemons} onChange={(e) => setPokemon(e.value)} multiple filter optionLabel="name"
                 style={{ width: '15rem' }} listStyle={{ maxHeight: '250px' }} />
        </>
    );
}
