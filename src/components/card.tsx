import Types from "./type";
import "/src/assets/style/card.css";

export default function Card({pokemon}: any, index: number) {
    return (
        <div id={index.toString()} className="pokemon-card">
            <div className="pokemon-name">
                <h1>{pokemon.name}</h1>
            </div>
            <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="pokemon-image"/>
            <Types types={pokemon.types}/>
        </div>
    )
}