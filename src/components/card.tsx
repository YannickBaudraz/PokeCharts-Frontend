import Types from "./type";
import "/src/assets/style/card.css";
import {Link} from "react-router-dom";

export default function Card({pokemon}: any, index: number) {
    return (
        <Link to={`/detail/${pokemon.id}`}>
            <div id={index.toString()} className="pokemon-card">
                <div className="pokemon-name">
                    <h1>{pokemon.name}</h1>
                </div>
                <img
                    src={pokemon.sprites.shiny}
                    alt={pokemon.name}
                    className="pokemon-image"/>
                <div className="pokemon-types">
                    <Types types={pokemon.types}/>
                </div>
            </div>
        </Link>
    )
}