import React, { useState } from "react";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";

const PokemonAdd: React.FC = () => {

    const [id] = useState<number>(Math.floor(Math.random() * 9999999));
    const [pokemon] = useState<Pokemon>(new Pokemon(id));

    return (
        <div>
            {
                <div className="row">
                    <h2 className="header center">Ajouté un Pokémon</h2>
                    <PokemonForm pokemon={pokemon} editionMode={false}/>
                </div>
            }
        </div>
    );
};

export default PokemonAdd;
