import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';


export default function Search() {
    const [value, setValue] = useState('Search Pokémons');
    return (    
        <form action="/" method="get" className="search">
            <div className="col-12 md:col-4">
                <div className="p-inputgroup">
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button icon="pi pi-search" className="p-button-warning" label="Search"/>
                </div>
            </div>
        </form>
    );
}
