import {useEffect, useState} from "react";
import "/src/assets/style/filter.css";

import Card from "../components/card";
import TypeFilter from "../components/typeFilter";
import StatFilter from "../components/statFilter";
import {InputSwitch} from "primereact/inputswitch";
import {Chart} from "primereact/chart";

export default function ChartPage() {
    const [pokemon, setPokemon] = useState<any>([]);
    const [filteredPokemon, setFilteredPokemon] = useState<any>([]);
    const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
    const [switchFilter, setSwitchFilter] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<any>(null);


    useEffect(() => {
        fetch("/src/assets/dataExamplePokemon.json")
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setLoadingPokemon(false);
                setFilteredPokemon(data);
                setSelectedType("Health");
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
        setSelectedType(stat);
    }

    const basicData = {
        labels: filteredPokemon.map((pokemon: any) => pokemon.name),
        datasets: [
            {
                label: selectedType,
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
                    {filteredPokemon.length === 0 && <h1>No pokemon found of this type.</h1>}
                    {!switchFilter ?
                        <div className="pokemon-container">
                            {filteredPokemon.map((pokemon: any, index: number) => {
                                return <Card key={index} pokemon={pokemon}/>
                            })}
                        </div> :
                        <div className="chart-container">
                            {filteredPokemon.length !== 0 && <Chart type="bar" data={basicData} options={basicOptions}/>}
                        </div>
                    }
                </div>
            }
        </>
    );
}