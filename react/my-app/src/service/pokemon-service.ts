import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';

export default class PokemonService {

    static pokemons: Pokemon[] = POKEMONS;

    static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

    static async getPokemons(): Promise<Pokemon[]> {
        if (this.isDev) {
            return fetch('http://localhost:3001/pokemon')
                .then(response => response.json())
                .catch(this.handleErrors);
        }

        return new Promise(resolve => {
            resolve(this.pokemons);
        });
    }

    static async getPokemon(id: number): Promise<Pokemon|null> {
        if (this.isDev) {
            return fetch(`http://localhost:3001/pokemon/${id}`)
                .then(response => response.json())
                .then(data => this.isEmty(data) ? null : data)
                .catch(this.handleErrors);
        }

        return new Promise(resolve => {
            const pokemon = this.pokemons.find(pokemon => pokemon.id === id);
            resolve(pokemon ? pokemon : null);
        });
    }

    static async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
        if (this.isDev) {
            return fetch(`http://localhost:3001/pokemon/${pokemon.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pokemon)
            })
                .then(response => response.json())
                .catch(this.handleErrors);
        }
       
        return new Promise(resolve => {
            const index = this.pokemons.findIndex(p => p.id === pokemon.id);
            this.pokemons[index] = pokemon;
            resolve(pokemon);
        });
    }

    static async deletePokemon(pokemon: Pokemon): Promise<{}> {
        if (this.isDev) {
            return fetch(`http://localhost:3001/pokemon/${pokemon.id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .catch(this.handleErrors);
        }

        return new Promise(resolve => {
            const { id } = pokemon;
            this.pokemons.filter(pokemon => pokemon.id !== id);
            resolve({});
        });
    }

    static async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
        delete pokemon.created;

        if (this.isDev) {
            return fetch(`http://localhost:3001/pokemon/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pokemon)
            })
                .then(response => response.json())
                .catch(this.handleErrors);
        }

        return new Promise(resolve => {
            this.pokemons.push(pokemon);
            resolve(pokemon);
        });
    }

    static async searchPokemon(term: string): Promise<Pokemon[]> {
        if (this.isDev) {
            return fetch(`http://localhost:3001/pokemon?q=${term}`)
                .then(response => response.json())
                .catch(this.handleErrors);
        }
        
        return new Promise(resolve => {
            const results = this.pokemons.filter(pokemon => pokemon.name.includes(term));
            resolve(results);
        });
    }

    static isEmty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleErrors(error: Error) {
        console.log('Erreur : ' + error.message);
    }
}