import '/src/assets/style/detail.css';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {ListBox} from 'primereact/listbox';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PokemonImage from '../components/Detail/PokemonImage';
import PokemonStateChart from '../components/Detail/PokemonStateChart';
import PokemonStateInfo from '../components/Detail/PokemonStateInfo';
import Pokemon from '../models/Pokemon';
import PokemonDex from '../models/PokemonDex';
import PokemonApi from '../services/pokemon-api';

const pokemonApi = new PokemonApi();

const listPokemonNames = await pokemonApi.getPokemonNames();


export default function Detail() {
    const [pokemon, setPokemon] = useState("Select a Pokemon");
    const [display, setDisplay] = useState(false);
    const [pokemonDetail, setPokemonDetail] = useState<Pokemon>();

    const getPokemonName = () => {
        const pokemonName: any = window.location.pathname.split('/')[2];
        if (pokemonName == undefined) {
            return "Select a Pokemon";
        }
        if (!isNaN(pokemonName)) {

            return listPokemonNames[pokemonName - 1] || "Select a Pokemon";
        }      
        const pokemon = listPokemonNames.find((pokemon: PokemonDex) => {
            return pokemonName == pokemon;
        });
        return pokemon;
    }
    
    if ( getPokemonName() !== pokemon) {
        setPokemon(getPokemonName());
    }

    useEffect(() => {
        setPokemon(getPokemonName());
        if (getPokemonName() == 'Select a Pokemon' || getPokemonName() == undefined) {
            setPokemonDetail(undefined);
            return;
        }
        pokemonApi.getPokemonByName(getPokemonName())
            .then((data) => {
                setPokemonDetail(data)
            })
            .catch(() => {
                console.log('Error occured when fetching pokemon data');
            });
    }, [getPokemonName()]);

    const getPokemonInfo = () => {
        const info: Pokemon = {} as Pokemon;
        if (pokemonDetail) {
            info.id = pokemonDetail.id;
            info.name = pokemonDetail.name;
            info.height = pokemonDetail.height;
            info.weight = pokemonDetail.weight;
        }
        return info;
    }

    const displayListBox = display ? 'block' : 'none'
    const displayPokemon = pokemonDetail !== undefined ? 'block' : 'none'

    let navigate = useNavigate();
    const routeChange = (pokemonName: String) => {
        let path = `/detail/${pokemonName}`;
        setDisplay(false)
        navigate(path);
    }

    // Constant that contains the template for the listbox
    const pokemonTemplate = (option: any) => {
        return (
            <div className="p-clearfix">
                <div style={{fontSize: '18px', margin: '10px 10px 0 0'}}>{option}</div>
            </div>
        );
    };

    return (
        <div className='details'>
            <div className="pokemonList">
                <Button
                    onClick={() => setDisplay(!display)}
                    className="pokemonTitle p-button-text p-button-plain p-button-lg">
                    <h1 className='pokemonName'>{pokemon || 'Select a Pokemon'} <i
                        className="pi pi-angle-down"></i></h1>
                </Button>
                <ListBox className='list' value={null} options={listPokemonNames}
                         onChange={(pokemon) => {
                             routeChange(pokemon.value[0])
                         }}
                         multiple filter optionLabel="name"
                         style={{width: '15rem', display: displayListBox}}
                        itemTemplate={pokemonTemplate} 
                         listStyle={{maxHeight: '250px'}}/>
            </div>
            {pokemonDetail &&
                <div className="pokemonDetail" style={{display: displayPokemon}}>
                    <div className="pokemonInfo">
                        <PokemonStateInfo pokemon={getPokemonInfo()}/>
                        <PokemonImage pokemon={getPokemonInfo()}/>
                        <PokemonStateChart pokemonStats={pokemonDetail.stats}/>
                    </div>
                </div>
            }
        </div>
    );
}
