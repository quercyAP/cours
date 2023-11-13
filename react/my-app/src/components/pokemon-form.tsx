import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import PokemonService from "../service/pokemon-service";

type Props = {
    pokemon: Pokemon
    editionMode: boolean
};

type Field = {
    value: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field,
    picture: Field
};

const PokemonForm: React.FC<Props> = ({ pokemon, editionMode }) => {

    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },
        picture: { value: pokemon.picture, isValid: true}
    });

    const navigate = useNavigate();

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    };

    const isAddForm = () => {
        return !editionMode;
    };
    
    const validateForm = () => {
        let newForm: Form = form;
        
        // Validate name
        if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = "Le nom du pokemon est requis (3 à 25 caractères)";
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ name: newField } };
        } else {
            const newField: Field = { value: form.name.value, error: "", isValid: true };
            newForm = { ...newForm, ...{ name: newField } };
        }

        // Validate hp
        if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = "Les points de vie du pokemon sont compris entre 0 et 999";
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ hp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: "", isValid: true };
            newForm = { ...newForm, ...{ hp: newField } };
        }

        // Validate cp
        if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = "Les dégâts du pokemon sont compris entre 0 et 99";
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ cp: newField } };
        } else { 
            const newField: Field = { value: form.cp.value, error: "", isValid: true };
            newForm = { ...newForm, ...{ cp: newField } };
        }

        // Validate url
        if (isAddForm()) {
            const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
            const end = ".png";

            if (form.picture.value.startsWith(start) && form.picture.value.endsWith(end)) {
                const newField: Field = { value: form.picture.value, error: "", isValid: true };
                newForm = { ...newForm, ...{ picture: newField } };
            } else {
                const errorMsg: string = `L'url doit commencer par ${start} et finir par ${end}`;
                const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
                newForm = { ...newForm, ...{ picture: newField } };
            }
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    };

    const types: string[] = [
        "Plante",
        "Feu",
        "Eau",
        "Insecte",
        "Normal",
        "Electrik",
        "Poison",
        "Fée",
        "Vol",
        "Combat",
        "Psy"
    ];

    const isTypesValid = (type: string): boolean => {
        if(form.types.value.length === 1 && hasType(type)) return false;
        if(form.types.value.length >= 3 && !hasType(type)) return false;
        return true;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Partial<Form> = {
            [fieldName]: { value: fieldValue }
        };

        setForm({ ...form, ...newField });
    };

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        let newField: Field;

        if (checked) {
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        }
        else {
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = { value: newTypes };
        }

        setForm({ ...form, ...{ types: newField } });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if(isFormValid) {
            pokemon.name = form.name.value;
            pokemon.hp = form.hp.value;
            pokemon.cp = form.cp.value;
            pokemon.types = form.types.value;
            pokemon.picture = form.picture.value;  

            isAddForm() ? addPokemon() : updatePokemon();
        }
    };

    const addPokemon = () => {
        PokemonService.createPokemon(pokemon)
        .then(() => navigate(`/pokemons`));
    };

    const updatePokemon = () => {
        PokemonService.updatePokemon(pokemon)
        .then(() => navigate(`/pokemons/${pokemon.id}`));
    };
    
    const deletePokemon = () => {
        PokemonService.deletePokemon(pokemon)
        .then(() => navigate(`/pokemons`));
    };
    
    return (
        <form className="row" onSubmit={e => handleSubmit(e)}>
            <div className="col s12 m8 offset-m2">
                <div className="card hoverable">
                    {!isAddForm() && (<div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name} style={{ width: "250px", margin: "0 auto" }} />
                        <span className="btn-floating halfway-fab waves-effect waves-light">
                            <i onClick={deletePokemon} className="material-icons">delete</i>
                        </span>
                    </div>)}
                    <div className="card-stacked">
                        <div className="card-content">
                            <div className="form-group">
                                <label htmlFor="picture">Lien de l'image</label>
                                <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)} />
                                {form.picture.error && <div className="card-panel red accent-1">{form.name.error}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)} />
                                {form.name.error && <div className="card-panel red accent-1">{form.name.error}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="hp">Point de vie</label>
                                <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)} />
                                {form.hp.error && <div className="card-panel red accent-1">{form.hp.error}</div>}
                            <div/>
                            <div className="form-group"></div>
                                <label htmlFor="cp">Dégâts</label>
                                <input id="cp" type="number" name="cp" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}/>
                                {form.cp.error && <div className="card-panel red accent-1">{form.cp.error}</div>}
                            </div>
                            <div className="form-group">
                                <label> Types</label>
                                {types.map(type => (
                                    <div key={type} style={{marginBottom: '10px'}}>
                                        <label>
                                            <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => {selectType(type, e)}}/>
                                            <span>
                                                <p className={formatType(type)}>{type}</p>
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-action center">
                            <button className="btn" type="submit">Valider</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    );
};

export default PokemonForm;