import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";
import PokemonService from "../service/pokemon-service";
import Loader from "../components/loader";

type Params = { id: string };

const PokemonEdit: React.FC = () => {
    
    const { id } = useParams<Params>();

    const [pokemon, setPokemon] = useState<Pokemon|null>(null);

    useEffect(() => {
        if (id !== undefined)
            PokemonService.getPokemon(+id).then(pokemon => setPokemon(pokemon));
    }, [id]);

    return (
        <div>
            { pokemon ? (
                <div className="row">
                    <h2 className="header center">Éditer { pokemon.name }</h2>
                    <PokemonForm pokemon={pokemon} editionMode={true}/>
                </div>
            ) : (
                <h4 className="center"><Loader /></h4>
            )}
        </div>
    );
};

export default PokemonEdit;
