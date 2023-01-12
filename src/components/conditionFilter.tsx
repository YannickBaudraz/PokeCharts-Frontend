import {Checkbox} from "primereact/checkbox";
import {useState} from "react";
import {InputNumber} from "primereact/inputnumber";

/**
 * This component is a filter with a text input and a radio button that filter the pokemon by its stats depending on a certain value
 * @param onConditionChangeChild
 * @constructor
 */
export default function ConditionFilter({onConditionChangeChild, onConditionValueChangeChild}: any) {
    // Constant that contains the selected condition
    const [selectedConditions, setSelectedConditions] = useState<any>([]);
    // Constant that contains the statement of the input field
    const [isFieldDisabled, setIsFieldDisabled] = useState<boolean>(true);

    /**
     * This function is a callback function for the checkbox component.
     * It is used to update the selected types.
     * @param e - The event object.
     */
    const onConditionChange = (e: { checked: boolean; value: any; }) => {
        // Create a copy of the selected conditions
        let tempSelectedConditions = [...selectedConditions];

        // If the checkbox is checked, add the condition to the array
        if (e.checked)
            tempSelectedConditions.push(e.value);
        else
            tempSelectedConditions.splice(selectedConditions.indexOf(e.value), 1);

        // Update the input field depending on the selected conditions
        tempSelectedConditions.length !== 0 ? setIsFieldDisabled(false) : setIsFieldDisabled(true);

        // Update the selected conditions
        setSelectedConditions(tempSelectedConditions);

        // Call the parent function to update the filtered pokemon.
        onConditionChangeChild(tempSelectedConditions.length > 0 ? tempSelectedConditions : null);
    }

    /**
     * This function is a callback function for the input number component.
     * @param e - The event object.
     */
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
            <InputNumber inputId="minmax-buttons" mode="decimal" disabled={isFieldDisabled}
                         allowEmpty={false} min={0} onValueChange={event => {
                onConditionValueChange(event.target)
            }}/>
        </div>
    )
}