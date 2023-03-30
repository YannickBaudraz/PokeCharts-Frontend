import {Dropdown} from "primereact/dropdown";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {ListBox} from "primereact/listbox";
import {Chart} from "primereact/chart";
import PokemonApi from "../services/pokemon-api";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import "../assets/style/movesComparison.css";

const pokemonApi = new PokemonApi();
export default function MovesComparison({selectedPokemon}: { selectedPokemon: any }) {
    // Constant that the selected move in the dropdown
    const [selectedMove, setSelectedMove] = useState<any>([]);
    // Constant that contains the damages inflicted by the selected move
    const [damages, setDamages] = useState<any>([]);
    // Boolean to check if the data is loading
    const [loadingMoves, setLoadingMoves] = useState<boolean>(true);
    // Boolean to check if the damages is loading
    const [loadingDamages, setLoadingDamages] = useState<boolean>(false);
    // Constant that contains all moves of the selected pokemon
    const [moves, setMoves] = useState<any>([]);
    // Constant that contains the template of the dropdown
    const moveTemplate = (option: any) => {
        return (
            <div className="p-d-flex p-ai-center">
                <div>{option.name}</div>
            </div>
        );

    }
    // Constant that contains the options of the bar chart
    const [barOptions] = useState({
        maintainAspectRatio: false,
        aspectRatio: 10,
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
        }
    });

    const effectColor = (effect: any) => {
        switch (effect) {
            case 4:
                return 'rgba(0,172,0,0.7)';
            case 2:
                return 'rgb(0, 172, 0, 0.2)';
            case 1:
                return 'rgba(116,115,115,0.2)';
            case 0.5:
                return 'rgba(255,99,132,0.2)';
            case 0.25:
                return 'rgba(255,99,132,0.7)';
            case 0:
                return 'rgb(0,0,0)';
            default:
                return 'rgb(0,0,0)';
        }
    }


    // Constant that contains the data of the chart
    const barData = ({
        labels: damages.map((damage: any) => damage.move.name),
        datasets: [
            {
                label: 'Damage',
                data: damages.map((damage: any) => damage.value),
                backgroundColor: damages.map((damage: any) => effectColor(damage.effect)),
                borderColor: damages.map((damage: any) => effectColor(damage.effect)),
                borderWidth: 1,
            },
        ],
    });

    // Get the moves of the selected pokemon
    useEffect(() => {
        pokemonApi.getPokemonMoves(selectedPokemon[0].id).then((data: any) => {
            setMoves(data.filter((move: any) => move.power !== 0));
            setLoadingMoves(false);
        });
        //reset the selected move
        setSelectedMove([]);
        setDamages([]);
    }, [selectedPokemon]);

    function onChangeMove(newMovesList: any) {
        if (newMovesList.length === 0) {
            setSelectedMove([]);
            setDamages([]);
            setLoadingDamages(false);
            return;
        }

        // If the selected move is null, set the new move
        if (selectedMove.length === 0) {
            setSelectedMove(newMovesList);
            pokemonApi.attackPokemon(selectedPokemon[0].id, selectedPokemon[1].id, newMovesList[0].id).then(r => {
                setDamages([{move: newMovesList[0], value: r[0], effect: r[1]}]);
            });
            setLoadingDamages(false);
            return;
        }

        // If the selected move is not null, make a comparison between the old and the new moves
        let oldMoveList = [...selectedMove];
        let newMoves = newMovesList.filter((move: any) => !oldMoveList.includes(move))[0];
        // If the new move is undefined, a move is removed from the list
        if (newMoves === undefined) {
            let oldMove = oldMoveList.filter((move: any) => !newMovesList.includes(move))[0];
            let newDamages = damages.filter((damage: any) => damage.move.id !== oldMove.id);
            setDamages(newDamages);
            setSelectedMove(newMovesList);
            setLoadingDamages(false);
            return;
        }

        // If the new move is not undefined, a move is added to the list
        if (newMoves.length !== 0) {
            setSelectedMove(newMovesList);
            pokemonApi.attackPokemon(selectedPokemon[0].id, selectedPokemon[1].id, newMoves.id).then(r => {
                setDamages([...damages, {move: newMoves, value: r[0], effect: r[1]}]);
            });
            setLoadingDamages(false);
            return;
        }
    }

    return (
        <>
            {loadingMoves && <p>Loading moves...</p>}
            {!loadingMoves &&
                <div className={"input-container"}>
                    <DataTable value={moves} paginator rows={10} dataKey={"id"} loading={loadingMoves}
                               emptyMessage={"No moves found."} selectionMode={"single"} selection={selectedMove}
                               onSelectionChange={(e) => {
                                   setLoadingDamages(true);
                                   onChangeMove(e.value)
                               }}>
                        <Column selectionMode={"multiple"} headerStyle={{width: '3rem'}}/>
                        <Column field={"name"} header={"Name"} sortable/>
                        <Column field={"power"} header={"Power"} sortable/>
                        <Column field={"moveCategory"} header={"Category"} sortable/>
                        <Column field={"type.name"} header={"Type"} sortable/>
                    </DataTable>
                    <div className={"charts-container"}>
                        <div className={"caption"}>
                            <div className={"caption-item"}>
                                <div className={"caption-color"} style={{backgroundColor: effectColor(4)}}>
                                    <p className={"caption-label"}>4x</p>
                                </div>
                            </div>
                            <div className={"caption-item"}>
                                <div className={"caption-color"} style={{backgroundColor: effectColor(2)}}>
                                    <p className={"caption-label"}>2x</p>
                                </div>
                            </div>
                            <div className={"caption-item"}>
                                <div className={"caption-color"} style={{backgroundColor: effectColor(1)}}>
                                    <p className={"caption-label"}>1x</p>
                                </div>
                            </div>
                            <div className={"caption-item"}>
                                <div className={"caption-color"} style={{backgroundColor: effectColor(0.5)}}>
                                    <p className={"caption-label"}>0.5x</p>
                                </div>
                            </div>
                            <div className={"caption-item"}>
                                <div className={"caption-color"} style={{backgroundColor: effectColor(0.25)}}>
                                    <p className={"caption-label"}>0.25x</p>
                                </div>
                            </div>
                        </div>
                        {loadingDamages && <p>Loading damages...</p>}
                        {damages.length === 0 && !loadingDamages && <p>Select a move to see the damages inflicted</p>}
                        {damages.length !== 0 && !loadingDamages &&
                            <Chart type="bar" data={barData} options={barOptions}/>
                        }
                    </div>
                </div>
            }
        </>
    );
}