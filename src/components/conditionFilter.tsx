import {Checkbox} from "primereact/checkbox";
import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";

/**
 * This component is a filter with a text input and a radio button that filter the pokemon by it's stats depending on a certain value
 * @param onConditionChangeChild
 * @constructor
 */
export default function ConditionFilter({onConditionChangeChild, onConditionValueChangeChild}: any) {
    // Constant that contains the selected condition
    const [selectedConditions, setSelectedConditions] = useState<any>([]);

    /**
     * This function is a callback function for the checkbox component.
     * It is used to update the selected types.
     * @param e - The event object.
     */
    const onConditionChange = (e: { checked: boolean; value: any; }) => {
        let tempSelectedConditions = [...selectedConditions];
        if (e.checked)
            tempSelectedConditions.push(e.value);
        else
            tempSelectedConditions.splice(selectedConditions.indexOf(e.value), 1);

        setSelectedConditions(tempSelectedConditions);

        // Call the parent function to update the filtered pokemon.
        onConditionChangeChild(tempSelectedConditions.length > 0 ? tempSelectedConditions : null);
    }

    const onConditionValueChange = (e: { value: any; }) => {
        onConditionValueChangeChild(e.value);
    }
    return (
        <div className="detail-container">
            <div className={"field-checkboxes"}>
                <div className="field-checkbox">
                    <Checkbox inputId="condition1" name="condition" value="<" onChange={onConditionChange}
                              checked={selectedConditions.includes("<")}/>
                    <label htmlFor="condition1">{"\<"}</label>
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="condition2" name="condition" value="=" onChange={onConditionChange}
                              checked={selectedConditions.includes("=")}/>
                    <label htmlFor="condition2">{"\="}</label>
                </div>
                <div className="field-checkbox">
                    <Checkbox inputId="condition3" name="condition" value=">" onChange={onConditionChange}
                              checked={selectedConditions.includes(">")}/>
                    <label htmlFor="condition3">{"\>"}</label>
                </div>
            </div>
            <InputText placeholder="Greater Than..." disabled={selectedConditions.length === 0}
                       onChange={event => {
                           onConditionValueChange(event.target);
                       }}/>
        </div>
    )
}