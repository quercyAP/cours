import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {

    return (
        <div className="center">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png" alt="Error" />
            <h1>Hey, cette page n'existe pas !</h1>
            <Link to="/" className="waves-effect waves-light btn-large">
                Retourner à l'accueil
            </Link>
        </div>
    );
};

export default PageNotFound;