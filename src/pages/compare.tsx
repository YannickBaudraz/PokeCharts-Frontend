import {useState} from "react";
import StatsComparison from "../components/statsComparison";


export default function Compare() {
    // Boolean to check if the data is loading
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
    // Constant that contains all selected pokemon
    const [selectedPokemon, setSelectedPokemon] = useState<any>([]);

    function onPokemonChange(pokemon: any, isFirstListbox: boolean) {
        let tempSelectedPokemon = [...selectedPokemon];
        getPokemonFromApi(pokemon.name).then((data: any) => {
            console.log(selectedPokemon);
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
        </>
    );
}