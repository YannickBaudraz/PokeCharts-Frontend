export default class PokemonApi {

    static async getAllPokemon() {
        return fetch('/src/data/ListPokemon.json')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    static async getPokemon() {
        return fetch('/src/data/pokemonStats.json')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
