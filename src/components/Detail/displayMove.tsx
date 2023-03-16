import {useEffect, useState} from "react";
import Move from "../../models/Move";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import PokemonApi from "../../services/pokemon-api";

export default function DisplayMove({pokemonId}: {pokemonId: number}) {
    const [moves, setMoves] = useState<Move[]>([]);

    useEffect(() => {
        const pokemonApi = new PokemonApi();
        pokemonApi.getPokemonMoves(pokemonId).then((data) => {
            setMoves(data);
        });
    }, [pokemonId]);

    return (
        <div className="move">
            <DataTable value={moves} sortMode="multiple" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} >
                <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
                <Column field="power" header="Base stat" sortable style={{ width: '25%' }}></Column>
                <Column field="moveCategory" header="Category" sortable style={{ width: '25%' }}></Column>
                <Column field="type.name" header="Type" sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}