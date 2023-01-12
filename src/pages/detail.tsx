
import { useState } from 'react';
import pokemons from '../data/pokemon.json'; 
import { ListBox } from 'primereact/listbox';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
 
 
export default function Detail() {
    const [pokemon, setPokemon] = useState(null);
    const [display, setDisplay] = useState(false);
 
    const PokemonName = window.location.pathname.split('/')[2] || 'Select a Pokemon';

    const displayListBox =()=> display || PokemonName == 'Select a Pokemon'? 'visible' :'hidden'

    const redirectToPokemonPage = (pokemonName:string) => window.location.href = `/detail/${pokemonName}`
    
    return (
        <>
        <Button 
            onClick={()=>setDisplay(!display)}
            className="p-button-text p-button-plain pokemonTitle p-button-lg">
            {PokemonName} <i className="pi pi-angle-down"></i> 
        </Button>

        <Link to={'/detail/pol'} className={'navbar_link'}>
            
        </Link>
        <ListBox className='listbox' value={null} options={pokemons} 
            onChange={(e) => {
                setPokemon(e.value)
                redirectToPokemonPage(e.value[0].name)
            }} 
            multiple filter optionLabel="name"
            style={{ width: '15rem', visibility: displayListBox() }} 
            listStyle={{ maxHeight: '250px' }} />
                 
        
        </>
    );
}
