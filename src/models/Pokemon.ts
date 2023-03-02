import PokemonSprites from './PokemonSprites';
import Stats from './Stats';
import Type from './Type';

export default interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  stats: Stats;
  types: Type[];
}
