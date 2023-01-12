import {Checkbox} from "primereact/checkbox";
import {useEffect, useState} from "react";

/**
 * This component is a filter for the types of the pokemon.
 * It is used in the chart page.
 * @param onTypeChangeChild - This function is used to pass the selected types to the parent component.
 */
export default function TypeFilter({onTypeChangeChild}: any) {
    const [loadingTypes, setLoadingTypes] = useState<boolean>(true);
    const [types, setTypes] = useState<any>([]);
    const [selectedTypes, setSelectedTypes] = useState<any>([]);

    /**
     * This function is a callback function for the checkbox component.
     * It is used to update the selected types.
     * @param e - The event object.
     */
    const onTypeChange = (e: { checked: boolean; value: any; }) => {
        let tempSelectedTypes = [...selectedTypes];
        if (e.checked)
            tempSelectedTypes.push(e.value);
        else
            tempSelectedTypes.splice(selectedTypes.indexOf(e.value), 1);

        setSelectedTypes(tempSelectedTypes);
        
        // Call the parent function to update the filtered pokemon.
        onTypeChangeChild(tempSelectedTypes.length > 0 ? tempSelectedTypes : null);
    }

    /**
     * Fetches the types from the Json file
     */
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