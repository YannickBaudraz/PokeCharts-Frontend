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

    public async getPokemonById(id: number) {
        return fetch('https://localhost:7149/Pokemons/' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    public async getPokemonByName(name: string) {
        return fetch('https://localhost:7149/Pokemons/' + name)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    public async getPokemonNames() {
        return fetch('https://localhost:7149/Pokemons/Names')
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    public async getPokemonByFilters(types: [], stat: any, conditions: [], conditionValue: any) {
        const url = 'https://localhost:7149/Pokemons/Filter?types=' + types.toString().toLowerCase() + '&stat=' + stat.toLowerCase() + '&conditions=' + conditions + '&conditionValue=' + conditionValue;
        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
