import {RadioButton} from "primereact/radiobutton";
import {useEffect, useState} from "react";

export default function StatFilter({onStatChangeChild}: any) {
    const [loadingStats, setLoadingStats] = useState<boolean>(true);
    const [stats, setStats] = useState<any>([]);
    const [selectedStat, setSelectedStat] = useState<any>(null);

    const onStatChange = (e: { value: any; }) => {
        setSelectedStat(e.value);
        onStatChangeChild(e.value);
    }

    useEffect(() => {
        fetch("/src/assets/dataExampleStats.json")
            .then(response => response.json())
            .then(data => {
                setStats(data);
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