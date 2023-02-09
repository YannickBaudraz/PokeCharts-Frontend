
import { useState } from 'react';
import pokemons from '../data/pokemons.json';
import poke from '../data/pokemonStats.json'; 
import { ListBox } from 'primereact/listbox';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import PokemonStateChart from "../components/Detail/PokemonStateChart"
import PokemonStateInfo from '../components/Detail/PokemonStateInfo';
import PokemonImage from '../components/Detail/PokemonImage';
import PokemonStats from '../models/PokemonStats';
import Pokemon from '../models/Pokemon';
import '/src/assets/style/detail.css';
 
 
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

    const getPokemonStats = ():PokemonStats => {
        const stats:PokemonStats = {} as PokemonStats;
        pokemonData?.pokemon_v2_pokemonstats.forEach((stat) => {
            // @ts-ignore
            stats[stat.pokemon_v2_stat.name] = stat.base_stat;
        });
        return stats;     
    }

    const getPokemonInfo = () => {
        const info:Pokemon = {} as Pokemon;
       if (pokemonData) {
            info.id = pokemonData.id;
            info.name = pokemonData.name;
            info.height = pokemonData.height;
            info.weight = pokemonData.weight;
        }
        return info;
    }
    
    const displayListBox = display || getPokemonName() == 'Select a Pokemon'? 'block' :'none'
    const displayPokemon = pokemonData !== undefined? 'block' :'none'

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
                {getPokemonName()||'Select a Pokemon'} <i className="pi pi-angle-down"></i> 
            </Button>
            <ListBox className='listbox' value={null} options={pokemons} 
                onChange={(e) => {
                    setPokemon(e.value)
                    routeChange(e)
                }} 
                multiple filter optionLabel="name"
                style={{ width: '15rem', display: displayListBox}} 
                listStyle={{ maxHeight: '250px' }} />
        </div>
        {pokemonData &&
         <div className="pokemonDetail" style={{display: displayPokemon }}>
         <div className="pokemonInfo">      
             <PokemonStateInfo pokemon={getPokemonInfo()} />
             <PokemonImage pokemon={getPokemonInfo()} /> 
             <PokemonStateChart pokemonStats={getPokemonStats()} />
         </div>
     </div>  }
            
                    
    </>        
    );
}