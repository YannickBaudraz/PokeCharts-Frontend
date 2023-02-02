
import { useState } from 'react';


export default function PokemonStateInfo( {pokemon}) {
    const getHeight = () =>(pokemon?.height)/10 + 'm'
    const getWeight = () => (pokemon?.weight)/10 + 'kg'
    const capitalize = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);
    if (!pokemon) return null;
    return (
    <div className="pokemonSize">
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>#{pokemon?.id}</td>
            </tr>
            <tr>
                <th>Name</th>
                <td>{capitalize(pokemon.name)}</td>
            </tr>
            <tr>
                <th>Height</th>
                <td>{getHeight()}</td>
            </tr>
            <tr>
                <th>Weight</th>
                <td>{getWeight()}</td>
            </tr>
        </tbody>
    </table>
    </div>
    ) 
}

