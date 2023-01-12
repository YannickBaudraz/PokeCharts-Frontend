
import { useState } from 'react';
import pokemons from '../data/pokemon.json'; 
import { ListBox } from 'primereact/listbox';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
 
 
export default function Detail() {

    const [pokemon, setPokemon] = useState(null);
    const [display, setDisplay] = useState(true);

    const getPokemonName = () => pokemon ? pokemon[0].name: ''

    const displayListBox =()=> display? 'visible' :'hidden'
    
    return (
        <>
        <Button 
            onClick={()=>setDisplay(!display)}
            className="p-button-text p-button-plain pokemonTitle p-button-lg">
            {getPokemonName()} <i className="pi pi-angle-down"></i> 
        </Button>
                 
         <ListBox className='listbox' value={null} options={pokemons} 
            onChange={(e) => {setPokemon(e.value); setDisplay(false)}} 
            multiple filter optionLabel="name"
            style={{ width: '15rem', visibility: displayListBox() }} 
            listStyle={{ maxHeight: '250px' }} />
        </>
    );
}
