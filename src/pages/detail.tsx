
import { useState } from 'react';
import pokemons from '../data/pokemon.json';
import poke from '../data/poke.json'; 
import { ListBox } from 'primereact/listbox';
import { Image } from 'primereact/image';
import { Chart } from 'primereact/chart';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
 
 
export default function Detail() {
    const [pokemon, setPokemon] = useState(null);
    const [display, setDisplay] = useState(false);
    
 
    const PokemonName = window.location.pathname.split('/')[2] || 'Select a Pokemon';

    const pokemonData = poke.find((pokemon) => pokemon.name == PokemonName);
    const stats = pokemonData?.pokemon_v2_pokemonstats;
    
    const pokemonImage = () => {
        if (pokemonData?.id) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`
        }
        return ''
    }

    const displayListBox =()=> display || PokemonName == 'Select a Pokemon'? 'block' :'none'
    const displayPokemon =()=> pokemonData !== undefined? 'block' :'none'

    let navigate = useNavigate(); 
    const routeChange = (e:any) =>{ 
      const pokemonName = e.value[0].name
      let path = `/detail/${pokemonName}`; 
      setDisplay(false)
      navigate(path);
    }

    //data for chart
    const statLabel = () => stats?.map((stat) => ( stat.pokemon_v2_stat.name ))
    const statData = () =>  stats?.map((stat) => ( stat.base_stat ))

    const [basicData] = useState({
        labels: statLabel(),
        datasets: [
            {
                label: 'bases stats',
                backgroundColor: '#42A5F5',
                data: statData()
            },
        ]
    });

    let horizontalOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (
    <>
    <div className="pokemonList">
        <Button 
            onClick={()=>setDisplay(!display)}
            className="pokemonTitle p-button-text p-button-plain p-button-lg">
            {PokemonName} <i className="pi pi-angle-down"></i> 
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
            <div className="pokemonSize">
                <p>Id: {pokemonData?.id}</p>
                <p>Height: {(pokemonData?.height) }</p>
                <p>Weight: {pokemonData?.weight}</p>
            </div>
            <Image src={pokemonImage()} alt={pokemonData?.name} width="250" preview />  
            <div className="card">
                <Chart type="bar" data={basicData} options={horizontalOptions} />
            </div>   
        </div>
    </div>                      
    </>        
    );
}
