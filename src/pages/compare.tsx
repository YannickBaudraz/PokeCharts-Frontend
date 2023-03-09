import {useState} from "react";
import StatsComparison from "../components/statsComparison";
import MovesComparison from "../components/movesComparison";
import PokemonApi from "../services/pokemon-api";

const pokemonApi = new PokemonApi();

export default function Compare() {
    // Constant that contains all selected pokemon
    const [selectedPokemon, setSelectedPokemon] = useState<any>([]);

    function onPokemonChange(pokemon: any, isFirstListbox: boolean) {
        let tempSelectedPokemon = [...selectedPokemon];
        getPokemonFromApi(pokemon).then((data: any) => {
            if (isFirstListbox) {
                tempSelectedPokemon[0] = data;
            } else {
                tempSelectedPokemon[1] = data;
            }
            setSelectedPokemon(tempSelectedPokemon);
        });
    }

    function getPokemonFromApi(pokemonName: string) {
        return pokemonApi.getPokemonByName(pokemonName);
    }

    return (
        <>
            <StatsComparison selectedPokemon={selectedPokemon} onPokemonChange={onPokemonChange}/>
            {selectedPokemon.length === 2 && selectedPokemon[0] !== undefined && selectedPokemon[1] !== undefined &&
                <MovesComparison selectedPokemon={selectedPokemon}/>
            }
        </>
    );
}