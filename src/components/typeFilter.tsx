import {Checkbox} from "primereact/checkbox";
import {useEffect, useState} from "react";

export default function TypeFilter({onTypeChangeChild}: any) {
    const [loadingTypes, setLoadingTypes] = useState<boolean>(true);
    const [types, setTypes] = useState<any>([]);
    const [selectedTypes, setSelectedTypes] = useState<any>([]);

    const onTypeChange = (e: { checked: boolean; value: any; }) => {
        let tempSelectedTypes = [...selectedTypes];
        if (e.checked)
            tempSelectedTypes.push(e.value);
        else
            tempSelectedTypes.splice(selectedTypes.indexOf(e.value), 1);

        setSelectedTypes(tempSelectedTypes);

        onTypeChangeChild(tempSelectedTypes);
    }

    useEffect(() => {
        fetch("/src/assets/dataExampleTypes.json")
            .then(response => response.json())
            .then(data => {
                setTypes(data);
                setLoadingTypes(false);
            });
    }, []);

    return (
        <>
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
        </>
    )
}