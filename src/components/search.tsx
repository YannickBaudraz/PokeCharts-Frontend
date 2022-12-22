import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';


export default function Search({ searchQuery, setSearchQuery }: { searchQuery: any; setSearchQuery: any }) {
    return (    
        <form action="/detail" method="get" className="search">
            <div className="col-12 md:col-4">
                <div className="p-inputgroup">
                    <InputText value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)} />
            
                    <Button icon="pi pi-search" className="p-button-warning" label="Search"/>
                </div>
            </div>
        </form>
        
    );
}


