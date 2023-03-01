import {useEffect, useState} from 'react';
import {ListBox} from 'primereact/listbox';
import 'primeicons/primeicons.css';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import PokemonStateChart from "../components/Detail/PokemonStateChart"
import PokemonStateInfo from '../components/Detail/PokemonStateInfo';
import PokemonImage from '../components/Detail/PokemonImage';
import PokemonDex from "../models/PokemonDex";
import Pokemon from '../models/Pokemon';
import PokemonStats from '../models/PokemonStats';
import '/src/assets/style/detail.css';
import PokemonApi from "../services/pokemon-api";

const pokemonApi = new PokemonApi();

const listPokemon = await pokemonApi.getAllPokemon();

export default function Detail() {
    const [pokemon, setPokemon] = useState("Select a Pokemon");
    const [display, setDisplay] = useState(false);
    const [pokemonDetail, setPokemonDetail] = useState(null);

    const getPokemonName = () => {
        const pokemonName: any = window.location.pathname.split('/')[2];
        const pokemon = listPokemon.find((pokemon: PokemonDex) => {
            return pokemonName == pokemon.id || pokemonName == pokemon.name;
        });
        return pokemon?.name;
    }
    if (getPokemonName() == undefined && getPokemonName() !== pokemon ) {
        setPokemon(getPokemonName());
    }
   // console.log(pokemon)

    useEffect(() => {
        pokemonApi.getPokemon()
            .then((data) => {
                setPokemonDetail(data.find((pokemon: { name: any; }) => pokemon.name == getPokemonName()))
            })
            .catch(() => {
                console.log('Error occured when fetching pokemon data');
            });
    }, [getPokemonName()]);
    
    const getPokemonStats = (): PokemonStats => {
        const stats: PokemonStats = {} as PokemonStats;
        pokemonDetail?.pokemon_v2_pokemonstats.forEach((stat: { pokemon_v2_stat: { name: string; }; base_stat: any; }) => {
            // @ts-ignore
            stats[stat.pokemon_v2_stat.name] = stat.base_stat;
        });
        return stats;
    }

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
                        <PokemonStateChart pokemonStats={getPokemonStats()}/>
                    </div>
                </div>
            }
        </div>
    );
}
