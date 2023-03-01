export default class PokemonApi {

    public async getAllPokemon() {
        return fetch('http://localhost:3000/ListPokemon')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    public async getPokemon() {
        return fetch('http://localhost:3000/pokemonStats')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
