import {useState, useEffect} from "react";
import {Checkbox} from "primereact/checkbox";
import "/src/assets/style/filter.css";
import {RadioButton} from "primereact/radiobutton";

import Card from "../components/card";

export default function Chart() {
    const [types, setTypes] = useState<any>([]);
    const [selectedTypes, setSelectedTypes] = useState<any>([]);
    const [stats, setStats] = useState<any>([]);
    const [selectedStat, setSelectedStat] = useState<any>(null);
    const [pokemon, setPokemon] = useState<any>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<any>([]);
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
    const [loadingTypes, setLoadingTypes] = useState<boolean>(true);
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
        fetch("/src/assets/dataExampleTypes.json")
            .then(response => response.json())
            .then(data => {
                setTypes(data);
                setLoadingTypes(false);
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

    const onTypeChange = (e: { checked: boolean; value: any; }) => {
        let tempSelectedTypes = [...selectedTypes];
        if (e.checked)
            tempSelectedTypes.push(e.value);
        else
            tempSelectedTypes.splice(selectedTypes.indexOf(e.value), 1);

        setSelectedTypes(tempSelectedTypes);


        if (tempSelectedTypes.length > 0) {
            setFilteredPokemon(pokemon.filter((pokemon: any) => {
                return pokemon.types.some((type: any) => tempSelectedTypes.includes(type));
            }));
        } else {
            setFilteredPokemon(pokemon);
        }
    }

    return (
        <>
            <div className="filter-container">
                {loadingTypes && <h1>Loading...</h1>}
                {!loadingTypes &&
                    <div className="types-container">
                        {types.map((type: any, index: number) => {
                                return (
                                    <div className="field-checkbox">
                                        <Checkbox inputId={"type" + index} value={type.name} onChange={onTypeChange}
                                                  checked={selectedTypes.includes(type.name)}></Checkbox>
                                        <label htmlFor={"type" + index} className="p-checkbox-label">{type.name}</label>
                                    </div>
                                )
                            }
                        )}
                    </div>
                }
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