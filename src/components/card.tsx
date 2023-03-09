import Types from "./type";
import "/src/assets/style/card.css";
import {Link} from "react-router-dom";

export default function Card({pokemon}: any, index: number) {
    return (
        <Link to={`/detail/${pokemon.id}`}>
            <div id={index.toString()} className="pokemon-card">
                <div className="pokemon-name">
                    <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                </div>
                <img
                    src={pokemon.sprites.shiny}
                    alt={pokemon.name}
                    onError={(e: any) => {
                        e.target.src = "src/assets/pokeball-800x600.gif"
                    }
                    }
                    className="pokemon-image"/>
                <div className="pokemon-types">
                    <Types types={pokemon.types}/>
                </div>
            </div>
        </Link>
    )
}