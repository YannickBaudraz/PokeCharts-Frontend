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

const listPokemon = await pokemonApi.getAllPokemon();

export default function Detail() {
    const [pokemon, setPokemon] = useState("Select a Pokemon");
    const [display, setDisplay] = useState(false);
    const [pokemonDetail, setPokemonDetail] = useState<Pokemon>();

    const getPokemonName = () => {
        const pokemonName: any = window.location.pathname.split('/')[2];
        const pokemon = listPokemon.find((pokemon: PokemonDex) => {
            return pokemonName == pokemon.id || pokemonName == pokemon.name;
        });
        return pokemon?.name;
    }

    if (pokemon == "Select a Pokemon" || getPokemonName() == undefined || getPokemonName() !== pokemon) {
        setPokemon(getPokemonName());
    }

    useEffect(() => {
        pokemonApi.getPokemon()
            .then((data) => {
                setPokemonDetail(data.find((pokemon: { name: any; }) => pokemon.name == getPokemonName()))
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

    const displayListBox = display || pokemon == 'Select a Pokemon' ? 'block' : 'none'
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
                <ListBox className='list' value={null} options={listPokemon}
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
