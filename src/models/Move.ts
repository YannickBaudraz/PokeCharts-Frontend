import Type from './Type';

export default interface Move {
  id: number;
  name: string;
  power: number;
  moveCategory: 'physical' | 'special' | 'status';
  type: Type;
}
