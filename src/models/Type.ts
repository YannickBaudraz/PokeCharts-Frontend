export default interface Type {
  id: number;
  name: string;
  doubleDamageTo?: Type[];
  halfDamageTo?: Type[];
  noDamageTo?: Type[];
}
