import PokemonStat from "./PokemonStats";

export default interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemonstats: PokemonStat[];
  }