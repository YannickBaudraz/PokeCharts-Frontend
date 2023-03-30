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
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);
    // Boolean to check if the page is waiting
    const [waiting, setWaiting] = useState<boolean>(true);
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
        switchFilter ? sortByStat(filteredPokemon, stat) : sortByDefault();
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
                data: filteredPokemon.map((pokemon: any) => selectedStat === "Health" ? pokemon.stats.hp : selectedStat === "Attack" ? pokemon.stats.attack : selectedStat === "Defense" ? pokemon.stats.defense : selectedStat === "Speed" ? pokemon.stats.speed : selectedStat === "Special Attack" ? pokemon.stats.specialAttack : pokemon.stats.specialDefense),
                backgroundColor: '#4f46e5',
                barThickness: 30,
                barPercentage: 1,
            },
        ],
    };

    // Constant that contains the options for the chart
    let basicOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            yAxes: [
                {
                ticks: {
                        beginAtZero: true,
                        precision: 0,
                },
            },
            ],
            xAxes: [
                {
                    categoryPercentage: 0.5,
                },
            ],
        },
    };

    function submitFilters() {
        setWaiting(false);
        setLoadingPokemon(true);
        let filters = {
            types: selectedType,
            stat: selectedStat,
            conditions: selectedConditions,
            conditionValue: selectedConditions !== null ? selectedConditionValue : 0
        }

        if (filters.conditions !== null && filters.conditionValue === null) {
            filters.conditionValue = 0;
        }

        if (selectedType !== null) {
            pokemonApi.getPokemonByFilters(selectedType, selectedStat, selectedConditions, filters.conditionValue).then((data: any) => {
                switchFilter ? sortByStat(data, selectedStat) : sortByDefault();
                setFilteredPokemon(data);
                setLoadingPokemon(false);
            });
        } else {
            setWaiting(true);
            setLoadingPokemon(false);
            setFilteredPokemon([]);
        }
    }

    function sortByStat(data: any, stat: any) {
        data.sort((a: any, b: any) => {
            switch (stat) {
                case "Health":
                    return b.stats.hp - a.stats.hp;
                case "Attack":
                    return b.stats.attack - a.stats.attack;
                case "Defense":
                    return b.stats.defense - a.stats.defense;
                case "Speed":
                    return b.stats.speed - a.stats.speed;
                case "Special Attack":
                    return b.stats.specialAttack - a.stats.specialAttack;
                case "Special Defense":
                    return b.stats.specialDefense - a.stats.specialDefense;
                default:
                    return b.stats.hp - a.stats.hp;
            }
        });
    }

    function sortByDefault() {
        filteredPokemon.sort((a: any, b: any) => {
            return a.id - b.id;
        });
    }

    function onChangeSwitch(e: any) {
        if (e.value) {
            // Sort the pokemon by the selected stat
            sortByStat(filteredPokemon, selectedStat);
        } else {
            // Sort the pokemon by the default order
            sortByDefault();
        }
        setSwitchFilter(e.value);
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
                <InputSwitch checked={switchFilter} onChange={(e) => onChangeSwitch(e)}/>
                <p>Switch to {switchFilter ? "Table" : "Chart"}</p>
            </div>

            {waiting && <h1>Apply filters to get the needed Pokemon.</h1>}
            {loadingPokemon && !waiting && <h1>Loading...</h1>}
            {!loadingPokemon && !waiting &&
                <div className="content-container">
                    {filteredPokemon.length === 0 && selectedType !== null && <h1>No pokemon found of this type.</h1>}
                    {!switchFilter ?
                        <div className="pokemon-container">
                            {filteredPokemon.map((pokemon: any, index: number) => {
                                return <Card key={index} pokemon={pokemon}/>
                            })}
                        </div> :
                        <div className="chart-container" style={{height: (filteredPokemon.length * 50) + 50, minHeight: "100px"}}>
                            {filteredPokemon.length !== 0 &&
                                <Chart type="bar" data={basicData} options={basicOptions}/>}
                        </div>
                    }
                </div>
            }
        </>
    );
}