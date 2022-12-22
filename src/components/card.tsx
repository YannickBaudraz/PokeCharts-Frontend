import Types from "./type";

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