export function getAllPokemon() {
    return fetch('/src/data/ListPokemon.json')
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}