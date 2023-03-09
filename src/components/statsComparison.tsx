import "/src/assets/style/statsComparison.css";
import {useEffect, useState} from "react";
import {ListBox} from "primereact/listbox";
import {Chart} from "primereact/chart";
import {InputSwitch} from "primereact/inputswitch";
import Types from "../components/type";
import PokemonApi from "../services/pokemon-api";

const pokemonApi = new PokemonApi();

export default function StatsComparison({selectedPokemon, onPokemonChange}: any) {
    // Boolean to check if the data is loading
    const [loadingPokemonNames, setLoadingPokemonNames] = useState<boolean>(true);
    // Array that will contain every pokemon filtered
    const [pokemonNames, setPokemonNames] = useState<any>([]);
    // Constant that contains the chart displayed
    const [switchFilter, setSwitchFilter] = useState<any>(false);
    // Create the radar chart options with a min and max value
    const [radarOptions] = useState({
        scales: {
            r: {
                pointLabels: {
                    color: '#495057',
                },
                grid: {
                    color: '#ebedef',
                },
                angleLines: {
                    color: '#ebedef'
                },
                suggestedMin: 0,
                suggestedMax: 130
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
            axis: 'xy'
        }
    });
    // Create the bar chart options
    const [barOptions] = useState({
        maintainAspectRatio: false,
        aspectRatio: .8,
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
        }
    });
    // Constant that contains the template for the listbox
    const pokemonTemplate = (option: any) => {
        return (
            <div className="p-clearfix">
                <div style={{fontSize: '18px', margin: '10px 10px 0 0'}}>{option}</div>
            </div>
        );
    };
    // Constant that contains the data for the chart
    const basicData = {
        labels: ['Health', 'Attack', 'Defense', 'Speed', 'Special Attack', 'Special Defense'],
        datasets: [
            {
                label: selectedPokemon[0] ? selectedPokemon[0].name : "Pokemon 1",
                data: selectedPokemon[0] ? [selectedPokemon[0].stats.hp, selectedPokemon[0].stats.attack, selectedPokemon[0].stats.defense, selectedPokemon[0].stats.speed, selectedPokemon[0].stats.specialAttack, selectedPokemon[0].stats.specialDefense] : [],
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)'

            },
            {
                label: selectedPokemon[1] ? selectedPokemon[1].name : "Pokemon 2",
                data: selectedPokemon[1] ? [selectedPokemon[1].stats.hp, selectedPokemon[1].stats.attack, selectedPokemon[1].stats.defense, selectedPokemon[1].stats.speed, selectedPokemon[1].stats.specialAttack, selectedPokemon[1].stats.specialDefense] : [],
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(54,162,235,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54,162,235,1)'

            }
        ],
    }

    // Function that will be called when the component is mounted
    // It, currently, fetch the pokemon information from the JSON
    // It will be change to get the pokemon names from the API
    useEffect(() => {
        pokemonApi.getPokemonNames().then((data) => {
            setLoadingPokemonNames(false);
            setPokemonNames(data);
        });
    }, []);

    return (
        <>
            {loadingPokemonNames && <h1>Pokemon names loading...</h1>}
            {!loadingPokemonNames &&
                <>
                    <div className={"input-container"}>
                        <div className={"input-container-items"}>
                            <ListBox value={selectedPokemon[0]} options={pokemonNames}
                                     onChange={(e) => onPokemonChange(e.value, true)} filter optionLabel="name"
                                     itemTemplate={pokemonTemplate} style={{width: '15rem'}}
                                     listStyle={{maxHeight: '150px'}}/>
                        </div>
                        <div className={"input-container-items"}>
                            <ListBox value={selectedPokemon[1]} options={pokemonNames}
                                     onChange={(e) => onPokemonChange(e.value, false)} filter optionLabel="name"
                                     itemTemplate={pokemonTemplate} style={{width: '15rem'}}
                                     listStyle={{maxHeight: '150px'}}/>
                        </div>
                    </div>

                    <div className={"comparison-container"}>
                        {selectedPokemon[0] !== undefined &&
                            <div className={"comparison-container-pokemon"}>
                                <h1 className={"comparison-container-pokemon-id"}>{selectedPokemon[0].id}</h1>

                                <img
                                    src={selectedPokemon[0].sprites.main}
                                    alt={selectedPokemon[0].name}
                                    className={"comparison-container-pokemon-image"}
                                />
                                <div className={"comparison-container-pokemon-details"}>
                                    <h4>{selectedPokemon[0].name}</h4>
                                    <h5>Height: {selectedPokemon[0].height}</h5>
                                    <h5>Weight: {selectedPokemon[0].weight}</h5>
                                    <div className={"comparison-container-pokemon-types"}>
                                        <Types types={selectedPokemon[0].types}/>
                                    </div>
                                </div>
                            </div>
                        }
                        {selectedPokemon[0] === undefined &&
                            <div className={"comparison-container-pokemon"}>
                                <h4>Select a pokemon...</h4>
                            </div>
                        }
                        <div className={"comparison-container-chart"}>
                            {(selectedPokemon[0] !== undefined || selectedPokemon[1] !== undefined) &&
                                <>
                                    <div className={"switch-container"}>
                                        <InputSwitch checked={switchFilter} onChange={(e) => setSwitchFilter(e.value)}/>
                                        <p>Switch to {switchFilter ? "radar chart" : "bar chart"}</p>
                                    </div>
                                    <Chart type={switchFilter ? "bar" : "radar"} data={basicData}
                                           options={switchFilter ? barOptions : radarOptions}
                                           style={{position: 'relative', width: '82%'}}/>
                                </>
                            }
                        </div>
                        {selectedPokemon[1] !== undefined &&
                            <div className={"comparison-container-pokemon"}>
                                <h1 className={"comparison-container-pokemon-id"}>{selectedPokemon[1].id}</h1>
                                <img
                                    src={selectedPokemon[1].sprites.main}
                                    alt={selectedPokemon[1].name}
                                    className={"comparison-container-pokemon-image"}
                                />
                                <div className={"comparison-container-pokemon-details"}>
                                    <h4>{selectedPokemon[1].name}</h4>
                                    <h5>Height: {selectedPokemon[1].height}</h5>
                                    <h5>Weight: {selectedPokemon[1].weight}</h5>
                                    <div className={"comparison-container-pokemon-types"}>
                                        <Types types={selectedPokemon[1].types}/>
                                    </div>
                                </div>
                            </div>
                        }
                        {selectedPokemon[1] === undefined &&
                            <div className={"comparison-container-pokemon"}>
                                <h4>Select a pokemon...</h4>
                            </div>
                        }
                    </div>

                </>
            }
        </>
    );
}