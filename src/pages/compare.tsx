import {useState} from "react";
import StatsComparison from "../components/statsComparison";
import MovesComparison from "../components/movesComparison";


export default function Compare() {
    // Constant that contains all selected pokemon
    const [selectedPokemon, setSelectedPokemon] = useState<any>([]);

    function onPokemonChange(pokemon: any, isFirstListbox: boolean) {
        let tempSelectedPokemon = [...selectedPokemon];
        getPokemonFromApi(pokemon.name).then((data: any) => {
            if (isFirstListbox) {
                tempSelectedPokemon[0] = data;
            } else {
                tempSelectedPokemon[1] = data;
            }
            setSelectedPokemon(tempSelectedPokemon);
        });
    }

    function getPokemonFromApi(pokemonName: string) {
        return fetch('/src/assets/dataExamplePokemon.json')
            .then((response) => response.json())
            .then((data) => {
                // Filter the data list by the name of the pokemon
                return data.filter((pokemon: any) => pokemon.name === pokemonName)[0];
            });
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