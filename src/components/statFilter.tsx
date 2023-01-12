import {RadioButton} from "primereact/radiobutton";
import {useEffect, useState} from "react";

/**
 * This component is a filter for the stats of the pokemon.
 * @param onStatChangeChild
 * @constructor
 */
export default function StatFilter({onStatChangeChild}: any) {
    // Constant that contains the progression of the loading stats
    const [loadingStats, setLoadingStats] = useState<boolean>(true);
    // Constant that contains all the stats
    const [stats, setStats] = useState<any>([]);
    // Constant that contains the selected stats
    const [selectedStat, setSelectedStat] = useState<any>(null);

    /**
     * This function is a callback function for the radio button component.
     * @param e - The event object.
     */
    const onStatChange = (e: { value: any; }) => {
        setSelectedStat(e.value);
        onStatChangeChild(e.value);
    }

    /**
     * This function is used to fetch the stats from the API.
     */
    useEffect(() => {
        fetch("/src/assets/dataExampleStats.json")
            .then(response => response.json())
            .then(data => {
                setStats(data);
                setSelectedStat(data[0].name);
                setLoadingStats(false);
            });
    }, []);

    return (
        <>
            {loadingStats && <h1>Loading...</h1>}
            {!loadingStats &&
                <div className="stats-container">
                    {
                        stats.map((stat: any, index: number) => {
                            return (
                                <div className="field-radiobutton">
                                    <RadioButton inputId={"stat" + index} name="stat" value={stat.name}
                                                 onChange={(e) => onStatChange(e)}
                                                 checked={selectedStat === stat.name}/>
                                    <label htmlFor={"stat" + index}>{stat.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}