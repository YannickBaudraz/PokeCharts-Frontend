import {useState} from "react";
import {Checkbox} from "primereact/checkbox";
import "/src/assets/css/filter.css";
import {RadioButton} from "primereact/radiobutton";

export default function Chart() {
    const [types, setTypes] = useState<any>([]);
    const [stat, setStat] = useState<any>(null);

    const onTypeChange = (e: { checked: boolean; value: any; }) => {
        let selectedTypes = [...types];
        if (e.checked)
            selectedTypes.push(e.value);
        else
            selectedTypes.splice(selectedTypes.indexOf(e.value), 1);

        setTypes(selectedTypes);
    }

    return (
        <>
            <div className="filter-container">
                <div className="types-container">
                    <div className="field-checkbox">
                        <Checkbox inputId="cb1" value="Normal" onChange={onTypeChange}
                                  checked={types.includes('Normal')}></Checkbox>
                        <label htmlFor="cb1" className="p-checkbox-label">Normal</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="cb2" value="Fire" onChange={onTypeChange}
                                  checked={types.includes('Fire')}></Checkbox>
                        <label htmlFor="cb2" className="p-checkbox-label">Fire</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="cb3" value="Water" onChange={onTypeChange}
                                  checked={types.includes('Water')}></Checkbox>
                        <label htmlFor="cb3" className="p-checkbox-label">Water</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb4" value="Grass" onChange={onTypeChange}
                                  checked={types.includes('Grass')}></Checkbox>
                        <label htmlFor="cb4" className="p-checkbox-label">Grass</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb5" value="Electric" onChange={onTypeChange}
                                  checked={types.includes('Electric')}></Checkbox>
                        <label htmlFor="cb5" className="p-checkbox-label">Electric</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb6" value="Ice" onChange={onTypeChange}
                                  checked={types.includes('Ice')}></Checkbox>
                        <label htmlFor="cb6" className="p-checkbox-label">Ice</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb7" value="Fighting" onChange={onTypeChange}
                                  checked={types.includes('Fighting')}></Checkbox>
                        <label htmlFor="cb7" className="p-checkbox-label">Fighting</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb8" value="Poison" onChange={onTypeChange}
                                  checked={types.includes('Poison')}></Checkbox>
                        <label htmlFor="cb8" className="p-checkbox-label">Poison</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb9" value="Ground" onChange={onTypeChange}
                                  checked={types.includes('Ground')}></Checkbox>
                        <label htmlFor="cb9" className="p-checkbox-label">Ground</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb10" value="Flying" onChange={onTypeChange}
                                  checked={types.includes('Flying')}></Checkbox>
                        <label htmlFor="cb10" className="p-checkbox-label">Flying</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb11" value="Psychic" onChange={onTypeChange}
                                  checked={types.includes('Psychic')}></Checkbox>
                        <label htmlFor="cb11" className="p-checkbox-label">Psychic</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb12" value="Bug" onChange={onTypeChange}
                                  checked={types.includes('Bug')}></Checkbox>
                        <label htmlFor="cb12" className="p-checkbox-label">Bug</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb13" value="Rock" onChange={onTypeChange}
                                  checked={types.includes('Rock')}></Checkbox>
                        <label htmlFor="cb13" className="p-checkbox-label">Rock</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb14" value="Ghost" onChange={onTypeChange}
                                  checked={types.includes('Ghost')}></Checkbox>
                        <label htmlFor="cb14" className="p-checkbox-label">Ghost</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb15" value="Dragon" onChange={onTypeChange}
                                  checked={types.includes('Dragon')}></Checkbox>
                        <label htmlFor="cb15" className="p-checkbox-label">Dragon</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb16" value="Dark" onChange={onTypeChange}
                                  checked={types.includes('Dark')}></Checkbox>
                        <label htmlFor="cb16" className="p-checkbox-label">Dark</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb17" value="Steel" onChange={onTypeChange}
                                  checked={types.includes('Steel')}></Checkbox>
                        <label htmlFor="cb17" className="p-checkbox-label">Steel</label>
                    </div>
                    <div className={"field-checkbox"}>
                        <Checkbox inputId="cb18" value="Fairy" onChange={onTypeChange}
                                  checked={types.includes('Fairy')}></Checkbox>
                        <label htmlFor="cb18" className="p-checkbox-label">Fairy</label>
                    </div>
                </div>
                <div className="stats-container">
                    <div className="field-radiobutton">
                        <RadioButton inputId="stat1" name="stat" value="Health" onChange={(e) => setStat(e.value)} checked={stat === 'Health'} />
                        <label htmlFor="stat1">Health</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="stat2" name="stat" value="Attack" onChange={(e) => setStat(e.value)} checked={stat === 'Attack'} />
                        <label htmlFor="stat2">Attack</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="stat3" name="stat" value="Defense" onChange={(e) => setStat(e.value)} checked={stat === 'Defense'} />
                        <label htmlFor="stat3">Defense</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="stat4" name="stat" value="Speed" onChange={(e) => setStat(e.value)} checked={stat === 'Speed'} />
                        <label htmlFor="stat4">Speed</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="stat5" name="stat" value="Special Attack" onChange={(e) => setStat(e.value)} checked={stat === 'Special Attack'} />
                        <label htmlFor="stat5">Special Attack</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="stat6" name="stat" value="Special Defense" onChange={(e) => setStat(e.value)} checked={stat === 'Special Defense'} />
                        <label htmlFor="stat6">Special Defense</label>
                    </div>
                </div>
            </div>
        </>
    );
}