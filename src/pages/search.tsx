import {useState} from "react";
import "/src/assets/style/filter.css";

import Card from "../components/card";
import TypeFilter from "../components/typeFilter";
import StatFilter from "../components/statFilter";
import ConditionFilter from "../components/conditionFilter";
import {InputSwitch} from "primereact/inputswitch";
import {Chart} from "primereact/chart";
import {Button} from "primereact/button";
import PokemonApi from "../services/pokemon-api";

const pokemonApi = new PokemonApi();

export default function Search() {
    // Array that will contain every pokemon filtered
    const [filteredPokemon, setFilteredPokemon] = useState<any>([]);
    // Boolean to check if the data is loading
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
    // Boolean to switch between the chart and the table
    const [switchFilter, setSwitchFilter] = useState<boolean>(false);
    // Constant that contains the selected types
    const [selectedType, setSelectedType] = useState<any>(null);
    // Constant that contains the selected stat
    const [selectedStat, setSelectedStat] = useState<any>('Health');
    // Constant that contains the selected condition
    const [selectedConditions, setSelectedConditions] = useState<any>(null);
    // Constant that contains the selected condition value
    const [selectedConditionValue, setSelectedConditionValue] = useState<any>(null);

    // Function that is called when the type filter is changed
    const onTypeChange = (types: any) => {
        setSelectedType(types);
    }

    // Function that is called when the stat filter is changed
    const onStatChange = (stat: any) => {
        setSelectedStat(stat);
    }

    // Function that is called when the condition filter is changed
    const onConditionChange = (conditions: any) => {
        setSelectedConditions(conditions);
    }

    // Function that is called when the condition value filter is changed
    const onConditionValueChange = (value: any) => {
        setSelectedConditionValue(value);
    }

    // Constant that contains the data for the chart
    const basicData = {
        labels: filteredPokemon.map((pokemon: any) => pokemon.name),
        datasets: [
            {
                label: selectedStat,
                data: filteredPokemon.map((pokemon: any) => selectedType === "Health" ? pokemon.stats.hp : selectedType === "Attack" ? pokemon.stats.attack : selectedType === "Defense" ? pokemon.stats.defense : selectedType === "Speed" ? pokemon.stats.speed : selectedType === "Special Attack" ? pokemon.stats.specialAttack : pokemon.stats.specialDefense),
                fill: false,
                backgroundColor: '#6366f1',
            }
        ],
    };

    // Constant that contains the options for the chart
    let basicOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        },
    };

    function submitFilters() {
        //TODO : Construct the query that will be sent to the backend, which will return the filtered data
        let filters = {
            types: selectedType,
            stat: selectedStat,
            conditions: selectedConditions,
            conditionValue: selectedConditions !== null ? selectedConditionValue : null
        }

        if (filters.conditions !== null && filters.conditionValue === null) {
            filters.conditionValue = 0;
        }

        pokemonApi.getFilteredPokemon(filters).then((data: any) => {
                setLoadingPokemon(false);
                // Verify if a type is selected and filter the data
                if (selectedType !== null) {
                    setFilteredPokemon(data.filter((pokemon: any) => {
                        return pokemon.types.some((type: any) => selectedType.includes(type));
                    }));
                } else {
                    // If no type is selected, set the filtered data to the original data
                    setLoadingPokemon(true)
                    setFilteredPokemon([]);
                }
            });
    }

    return (
        <>
            <div className="filter-container">
                <TypeFilter onTypeChangeChild={onTypeChange}/>
                <StatFilter onStatChangeChild={onStatChange}/>
                <ConditionFilter onConditionChangeChild={onConditionChange}
                                 onConditionValueChangeChild={onConditionValueChange}/>
                <Button label="Filter" onClick={submitFilters}/>
            </div>
            <div className={"switch-container"}>
                <InputSwitch checked={switchFilter} onChange={(e) => setSwitchFilter(e.value)}/>
                <p>Switch to {switchFilter ? "Table" : "Chart"}</p>
            </div>

            {loadingPokemon && <h1>Apply filters to get the needed Pokemon.</h1>}
            {!loadingPokemon &&
                <div className="content-container">
                    {filteredPokemon.length === 0 && selectedType !== null && <h1>No pokemon found of this type.</h1>}
                    {!switchFilter ?
                        <div className="pokemon-container">
                            {filteredPokemon.map((pokemon: any, index: number) => {
                                return <Card key={index} pokemon={pokemon}/>
                            })}
                        </div> :
                        <div className="chart-container">
                            {filteredPokemon.length !== 0 &&
                                <Chart type="bar" data={basicData} options={basicOptions}/>}
                        </div>
                    }
                </div>
            }
        </>
    );
}