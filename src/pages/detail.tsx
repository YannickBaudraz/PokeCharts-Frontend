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


//const listPokemon = await pokemonApi.getAllPokemon();


export default function Detail() {
    const [pokemon, setPokemon] = useState("Select a Pokemon");
    const [display, setDisplay] = useState(false);
    const [pokemonDetail, setPokemonDetail] = useState<Pokemon>();

    const getPokemonName = () => {
        const pokemonName: any = window.location.pathname.split('/')[2];
        if (pokemonName == undefined) {
            return "Select a Pokemon";
        }
        //if pokemonName is number return item in listPokemonNames using index
        if (!isNaN(pokemonName)) {
            return listPokemonNames[pokemonName - 1];
        }      
        const pokemon = listPokemonNames.find((pokemon: PokemonDex) => {
            return pokemonName == pokemon;
        });
        return pokemon;
    }
    
    if ( getPokemonName() !== pokemon) {
        console.log(pokemon)
        setPokemon(getPokemonName());
    }

    useEffect(() => {
        setPokemon(getPokemonName());
        if (getPokemonName() == 'Select a Pokemon') {
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
    const routeChange = (e: any) => {
        const pokemonName = e.value[0].name
        let path = `/detail/${pokemonName}`;
        setDisplay(false)
        navigate(path);
    }

    return (
        <div className='details'>
            <div className="pokemonList">
                <Button
                    onClick={() => setDisplay(!display)}
                    className="pokemonTitle p-button-text p-button-plain p-button-lg">
                    <h1 className='pokemonName'>{pokemon} <i
                        className="pi pi-angle-down"></i></h1>
                </Button>
                <ListBox className='list' value={null} options={listPokemonNames}
                         onChange={(e) => {
                             setPokemon(e.value[0].name)
                             routeChange(e)
                         }}
                         multiple filter optionLabel="name"
                         style={{width: '15rem', display: displayListBox}}
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
