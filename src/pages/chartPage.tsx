import {useState} from "react";
import "/src/assets/style/filter.css";

import Card from "../components/card";
import TypeFilter from "../components/typeFilter";
import StatFilter from "../components/statFilter";
import ConditionFilter from "../components/conditionFilter";
import {InputSwitch} from "primereact/inputswitch";
import {Chart} from "primereact/chart";
import {Button} from "primereact/button";

export default function ChartPage() {
    /* Old code that get all the data from the json file at the beginning
    const [allPokemon, setAllPokemon] = useState<any>([]);*/
    // New code that gets the data from the json file when the user clicks on the button
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

    const onTypeChange = (types: any) => {
        setSelectedType(types);
    }

    const onStatChange = (stat: any) => {
        setSelectedStat(stat);
    }

    const onConditionChange = (conditions: any) => {
        setSelectedConditions(conditions);
    }

    const onConditionValueChange = (value: any) => {
        setSelectedConditionValue(value);
    }

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
        // Create an object that will contain the filters
        let filters = {
            types: selectedType,
            stat: selectedStat,
            conditions: selectedConditions,
            conditionValue: selectedConditions !== null ? selectedConditionValue : null
        }
        if (filters.conditions !== null&&filters.conditionValue === null) {
            filters.conditionValue = 0;
        }
        console.log(filters);
        fetch("/src/assets/dataExamplePokemon.json")
            .then(response => response.json())
            .then(data => {
                setLoadingPokemon(false);
                if (selectedType !== null) {
                    setFilteredPokemon(data.filter((pokemon: any) => {
                        return pokemon.types.some((type: any) => selectedType.includes(type));
                    }));
                } else {
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
                <ConditionFilter onConditionChangeChild={onConditionChange} onConditionValueChangeChild={onConditionValueChange }/>
                <Button label="Filter" onClick={submitFilters}/>
                <InputSwitch checked={switchFilter} onChange={(e) => setSwitchFilter(e.value)}/>
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