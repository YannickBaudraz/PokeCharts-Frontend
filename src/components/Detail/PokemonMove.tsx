import {useEffect, useState} from "react";
import Move from "../../models/Move";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import PokemonApi from "../../services/pokemon-api";

export default function PokemonMove( {pokemonId}: {pokemonId: number}) {
    const [moves, setMoves] = useState<Move[]>([]);

    useEffect(() => {
        const pokemonApi = new PokemonApi();
        pokemonApi.getPokemonMoves(pokemonId).then((data) => {
            setMoves(data);
        });
    }, [pokemonId]);

    return (
        <div className="card">
            <DataTable value={moves}  sortMode="multiple"  tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                <Column field="power" header="Base stat" sortable style={{ width: '25%' }}></Column>
                <Column field="category" header="Category" sortable style={{ width: '25%' }}></Column>
                <Column field="type.name" header="Type" sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}