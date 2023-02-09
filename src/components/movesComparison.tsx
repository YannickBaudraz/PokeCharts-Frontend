import {Dropdown} from "primereact/dropdown";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {ListBox} from "primereact/listbox";
import {Chart} from "primereact/chart";

export default function MovesComparison({selectedPokemon}: { selectedPokemon: any }) {
    // Constant that the selected move in the dropdown
    const [selectedMove, setSelectedMove] = useState<any>([]);
    // Constant that contains the damages inflicted by the selected move
    const [damages, setDamages] = useState<any>([]);
    // Boolean to check if the data is loading
    const [loadingMoves, setLoadingMoves] = useState<boolean>(true);
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
    // Constant that contains the data of the chart
    const barData = ({
        labels: damages.map((damage: any) => damage.move.name),
        datasets: [
            {
                label: "Damage inflicted",
                data: damages.map((damage: any) => damage.value),
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)'

            }
        ],
    });

    // Get the moves of the selected pokemon
    useEffect(() => {
        fetch('/src/assets/dataExampleMoves.json')
            .then((response) => response.json())
            .then((data) => {
                // Filter the data list by the id of the pokemon
                setMoves(data.filter((move: any) => move.id === selectedPokemon[0].id)[0].moves);
                setLoadingMoves(false);
            });
    }, [selectedPokemon]);

    function onChangeMove(newMoveList: any) {

        // If the selected move is null, set the new move
        if (selectedMove.length === 0) {
            setSelectedMove(newMoveList);
            //TODO: Fetch the data of the damages
            console.log([{move: newMoveList[0], value: 10}])
            setDamages([{move: newMoveList[0], value: 10}]);
            return;
        }

        // If the selected move is not null, make a comparison between the old and the new moves
        let oldMoveList = [...selectedMove];
        let newMove = newMoveList.filter((move: any) => !oldMoveList.includes(move))[0];
        // If the new move is undefined, a move is removed from the list
        if (newMove === undefined) {
            setSelectedMove(newMoveList);
            //TODO: Remove the data of the damages for the removed move
            //Remove the damage where the selected move were
            setDamages(damages.filter((damage: any) => damage.move !== oldMoveList.filter((move: any) => !newMoveList.includes(move))[0]));
            return;
        }

        //TODO: Fetch the data of the damages for the new move
        setDamages([...damages, {move: newMove, value: 10}]);
        setSelectedMove(newMoveList);
    }

    return (
        <>
            {loadingMoves && <p>Loading moves...</p>}
            {!loadingMoves &&
                <div className={"input-container"}>
                    <ListBox value={selectedMove} options={moves}
                             onChange={(e) => onChangeMove(e.value)} filter optionLabel="name"
                             itemTemplate={moveTemplate} style={{width: '15rem'}}
                             listStyle={{maxHeight: '150px'}}
                             multiple
                    />
                    <Chart type="bar" data={barData} options={barOptions}/>
                </div>
            }
        </>
    );
}