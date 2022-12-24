import {useEffect, useState} from "react";
import "/src/assets/style/filter.css";
import {RadioButton} from "primereact/radiobutton";

import Card from "../components/card";
import TypeFilter from "../components/typeFilter";

export default function Chart() {
    const [stats, setStats] = useState<any>([]);
    const [selectedStat, setSelectedStat] = useState<any>(null);
    const [pokemon, setPokemon] = useState<any>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<any>([]);
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);

    const [loadingStats, setLoadingStats] = useState<boolean>(true);

    useEffect(() => {
        fetch("/src/assets/dataExamplePokemon.json")
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setLoadingPokemon(false);
                setFilteredPokemon(data);
            });
    }, []);

    useEffect(() => {
        fetch("/src/assets/dataExampleStats.json")
            .then(response => response.json())
            .then(data => {
                setStats(data);
                setLoadingStats(false);
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

    return (
        <>
            <div className="filter-container">
                <TypeFilter onTypeChangeChild={onTypeChange}/>
                <div className="stats-container">
                    {loadingStats && <h1>Loading...</h1>}
                    {!loadingStats &&
                        <>
                            {
                                stats.map((stat: any, index: number) => {
                                    return (
                                        <div className="field-radiobutton">
                                            <RadioButton inputId={"stat" + index} name="stat" value={stat.name}
                                                         onChange={(e) => setSelectedStat(e.value)}
                                                         checked={selectedStat === stat.name}/>
                                            <label htmlFor={"stat" + index}>{stat.name}</label>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                </div>
            </div>
            {loadingPokemon && <h1>Loading...</h1>}
            {!loadingPokemon &&
                <div className="chart-container">
                    <div className="pokemon-container">
                        {filteredPokemon.map((pokemon: any, index: number) => {
                            return <Card key={index} pokemon={pokemon}/>
                        })}
                        {filteredPokemon.length === 0 && <h1>No pokemon found of this type.</h1>}
                    </div>
                </div>
            }
        </>
    );
}