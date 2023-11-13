import React from "react";
import PokemonList from "./pages/pokemon-list";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";  
import PokemonDetail from "./pages/pokemon-detail";
import PageNotFound from "./pages/pages-not-found";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonAdd from "./pages/pokemon-add";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";

const App: React.FC = () => {

    return (
        <BrowserRouter>
                {/* La barre de navigation commun à toutes les pages */}
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokédex</Link>
                    </div>
                </nav>
            <Routes>
                {/* Le système de routage */}
                <Route path="/" element={<PrivateRoute path="/" element={<PokemonList />} />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/pokemons" element={<PrivateRoute path="/pokemons" element={<PokemonList />}/>} />
                <Route path="/pokemons/:id" element={<PrivateRoute path="/pokemons/:id" element={<PokemonDetail />}/>} />
                <Route path="/pokemons/edit/:id" element={<PrivateRoute path="/pokemons/edit/:id" element={<PokemonEdit />}/>}/>
                <Route path="/pokemons/add" element={<PrivateRoute path="/pokemons/add" element={<PokemonAdd />}/>}/>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
    </BrowserRouter>
   )
};

export default App;