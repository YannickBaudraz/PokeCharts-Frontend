import PokemonLight from '../models/PokemonLight';

export default class PokemonApi {

    /**
     * This method get the Pokémon by his id
     * @param id: pokemon id
     */
    public async getPokemonById(id: number) {
        return fetch(import.meta.env.VITE_BACKEND_URL + id)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**
     * This method get the Pokémon by his name
     * @param name: pokemon name
     */
    public async getPokemonByName(name: string) {
        return fetch(import.meta.env.VITE_BACKEND_URL + 'Pokemons/' + name)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**
     * This method get all the Pokémon names
     */
    public async getPokemonNames() {
        return fetch(import.meta.env.VITE_BACKEND_URL + 'Pokemons?light=true')
            .then((response) => response.json() as Promise<PokemonLight[]>)
            .then((data) => {
                return data.map((p) => p.name);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    /**
     * This method get all the Pokémon filtered by types, stat, conditions and condition value
     * @param types: Contains the types of the Pokémon
     * @param stat: Contains the stat of the Pokémon
     * @param conditions: Contains the conditions that the Pokémon will be filtered
     * @param conditionValue: Contains the value of the condition
     */
    public async getPokemonByFilters(types: [], stat: any, conditions: [], conditionValue: any) {
        const baseUrl = import.meta.env.VITE_BACKEND_URL + 'Pokemons/Filter?';
        const typesUrl = 'types=' + types.toString().toLowerCase();
        const statUrl = '&stat=' + stat.toLowerCase();
        const conditionsUrl = conditions !== null ? '&conditions=' + conditions + '&conditionValue=' + conditionValue : '';
        const url = baseUrl + typesUrl + statUrl + conditionsUrl;

        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    public async getPokemonMoves(pokemonId: number) {
        return fetch(import.meta.env.VITE_BACKEND_URL + 'PokemonMoves/' + pokemonId)
            .then((response) => response.json())
            .then((data) => {
                return data.map((move: any) => {
                    return {
                        id: move.id,
                        name: move.name,
                        power: move.power,
                        moveCategory: move.category == '1' ? 'physical' : move.category == '2' ? 'special' : 'status',
                        type: move.type
                    }
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
