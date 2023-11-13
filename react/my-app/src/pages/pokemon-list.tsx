import React, {useState, useEffect} from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../service/pokemon-service';
import PokemonSearch from '../components/pokemon-search';
import { Link } from 'react-router-dom';

const PokemonList: React.FC = () => {
    const [pokemons, setPokedex] = useState<Pokemon[]>([]);

    useEffect(() => {
        PokemonService.getPokemons().then(pokemon => setPokedex(pokemon));
    }, []);

    return (
        <div>
            <h1 className="center">Pokédex </h1>
            <div className="container">
                <div className="row">
                    <PokemonSearch />
                    {pokemons.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                    ))}
                </div>
            <Link to="/pokemons/add" className="btn-floating btn-large waves-effect waves-light red z-depth=3 pulse"
                style={{position: 'fixed', bottom: '20px', right: '25px'}}>
                <i className="material-icons">add</i>
            </Link>
            </div>
        </div>
    )
}

export default PokemonList;