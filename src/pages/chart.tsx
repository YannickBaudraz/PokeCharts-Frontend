import {useEffect, useState} from "react";
import "/src/assets/style/filter.css";

import Card from "../components/card";
import TypeFilter from "../components/typeFilter";
import StatFilter from "../components/statFilter";
import {InputSwitch} from "primereact/inputswitch";

export default function Chart() {
    const [pokemon, setPokemon] = useState<any>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<any>([]);
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
    const [switchFilter, setSwitchFilter] = useState<boolean>(false);


    useEffect(() => {
        fetch("/src/assets/dataExamplePokemon.json")
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setLoadingPokemon(false);
                setFilteredPokemon(data);
            });
    }, []);

    const onTypeChange = (types: any) => {
        if (types.length > 0) {
            setFilteredPokemon(pokemon.filter((pokemon: any) => {
                return pokemon.types.some((type: any) => types.includes(type));
            }));
        } else {
            setFilteredPokemon(pokemon);
        }
    }

    const onStatChange = (stat: any) => {
        // TODO: Implement this function.
    }

    return (
        <>
            <div className="filter-container">
                <TypeFilter onTypeChangeChild={onTypeChange}/>
                <StatFilter onStatChangeChild={onStatChange}/>
                <InputSwitch checked={switchFilter} onChange={(e) => setSwitchFilter(e.value)}/>
            </div>
            {loadingPokemon && <h1>Loading...</h1>}
            {!loadingPokemon &&
                <div className="content-container">
                    {!switchFilter ?
                        <div className="pokemon-container">
                            {filteredPokemon.map((pokemon: any, index: number) => {
                                return <Card key={index} pokemon={pokemon}/>
                            })}
                            {filteredPokemon.length === 0 && <h1>No pokemon found of this type.</h1>}
                        </div> :
                        <div className="chart-container">
                            <h1>Chart</h1>
                        </div>
                    }
                </div>
            }
        </>
    );
}