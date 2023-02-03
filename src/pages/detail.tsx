
import { useState } from 'react';
import pokemons from '../data/pokemons.json';
import poke from '../data/pokemonStats.json'; 
import { ListBox } from 'primereact/listbox';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import PokemonStateChart from "../components/Detail/PokemonStateChart"
import PokemonStateInfo from '../components/Detail/PokemonStateInfo';
import PokemonImage from '../components/Detail/PokemonImage';
 
 
export default function Detail() {
    const [pokemon, setPokemon] = useState(null);
    const [display, setDisplay] = useState(false);
    
     const getPokemonName = () => {
        const pokemonName:any = window.location.pathname.split('/')[2];
        const pokemon = pokemons.find((pokemon) => {
            return pokemonName == pokemon.id || pokemonName == pokemon.name;
        });
        return pokemon?.name;
    }

    const pokemonData = poke.find((pokemon) => pokemon.name == getPokemonName());

    


    const pokemonStats = () => {
        const statArray = [];
        const stats = pokemonData?.pokemon_v2_pokemonstats.forEach((stat) => {
            statArray.push({name: stat.pokemon_v2_stat.name, value: stat.base_stat})
        })
        return statArray;
    }
    
    
    const displayListBox =()=> display || getPokemonName() == 'Select a Pokemon'? 'block' :'none'
    const displayPokemon =()=> pokemonData !== undefined? 'block' :'none'

    let navigate = useNavigate(); 
    const routeChange = (e:any) =>{ 
      const pokemonName = e.value[0].name
      let path = `/detail/${pokemonName}`; 
      setDisplay(false)
      navigate(path);
    }

    return (
    <>
    <div className="pokemonList">
        <Button 
            onClick={()=>setDisplay(!display)}
            className="pokemonTitle p-button-text p-button-plain p-button-lg">
            {getPokemonName()} <i className="pi pi-angle-down"></i> 
        </Button>
        <ListBox className='listbox' value={null} options={pokemons} 
            onChange={(e) => {
                setPokemon(e.value)
                routeChange(e)
            }} 
            multiple filter optionLabel="name"
            style={{ width: '15rem', display: displayListBox() }} 
            listStyle={{ maxHeight: '250px' }} />
    </div>
             
    <div className="pokemonDetail" style={{display: displayPokemon() }}>
        <div className="pokemonInfo">      
            <PokemonStateInfo pokemon={pokemonData} />
            <PokemonImage pokemon={pokemonData} /> 
            <PokemonStateChart pokemonStats={pokemonStats()} />
        </div>
    </div>                      
    </>        
    );
}
