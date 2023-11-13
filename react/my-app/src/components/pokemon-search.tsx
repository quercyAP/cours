import React, { useState } from "react";
import Pokemon from "../models/pokemon";
import PokemonService from "../service/pokemon-service";
import { Link } from "react-router-dom";

const PokemonSearch: React.FC = () => {
    
        const [term, setTerm] = useState<string>("");
        const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            setTerm(event.target.value);

            if (term.length <= 1) {
                setPokemon([]);
                return;
            }
    
            PokemonService.searchPokemon(term).then(pokemon => setPokemon(pokemon)).then(() => console.log(pokemon));
        };

        return (
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card">
                        <div className="card-content">
                            <div className="input-field">
                                <input type="text" placeholder="Rechercher un pokémon" value={term} onChange={handleInputChange} />
                            </div>
                            <div className="collection">
                                {pokemon.map(pokemon => (
                                    <Link to={`/pokemons/${pokemon.id}`} className="collection-item" key={pokemon.id}>
                                        {pokemon.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
};

export default PokemonSearch;