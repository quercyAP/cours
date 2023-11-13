import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthenticationService from '../service/authentication-service';

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    username: Field,
    password: Field
};

const Login: React.FC = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState<Form>({
        username: { value: ""},
        password: { value: ""}
    });

    const [message, setMessage] = useState<string>("Vous êtes déconnecté. (pikachu / pikachu)");
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    };

    const validateForm = () => {
        let newForm: Form = form;

        // Validate username
        if (form.username.value.length < 3)
        {
            const errorMsg: string = "Le nom d'utilisateur doit contenir au moins 3 caractères";
            const newField: Field = { value: form.username.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ username: newField } };
        } else {
            const newField: Field = { value: form.username.value, error: "", isValid: true };
            newForm = { ...newForm, ...{ username: newField } };
        }

        // Validate password
        if (form.password.value.length < 6)
        {
            const errorMsg: string = "Le mot de passe doit contenir au moins 6 caractères";
            const newField: Field = { value: form.password.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ password: newField } };
        } else {
            const newField: Field = { value: form.password.value, error: "", isValid: true };
            newForm = { ...newForm, ...{ password: newField } };
        }

        setForm(newForm);
        return newForm.username.isValid && newForm.password.isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            setMessage("Tentative de connexion en cours...");
            AuthenticationService.login(form.username.value, form.password.value).then(isAuthenticated => {
                if (!isAuthenticated) {
                    setMessage("Mauvais nom d'utilisateur ou mot de passe.");
                    return;
                }
                else {
                    navigate("/");
                }
            });
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-stacked">
                            <div className="card-content">
                                {/* Form message*/}
                                {message && <div className="form-group">
                                    <div className="card-panel grey lighten-5">
                                        {message}
                                    </div>
                                </div>}
                                {/* Field username */}
                                <div className="form-group">
                                    <label htmlFor="username">Nom d'utilisateur</label>
                                    <input id="username" name="username" type="text" className="form-control" value={form.username.value} onChange={e => handleInputChange(e)} />
                                    {/* Error */}
                                    {form.username.error && 
                                    <div className="card-panel red accent-1">{form.username.error}</div>}
                                </div>
                                {/* Field password */}
                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input id="password" name="password" type="password" className="form-control" value={form.password.value} onChange={e => handleInputChange(e)} />
                                    {/* Error */}
                                    {form.password.error &&
                                    <div className="card-panel red accent-1">{form.password.error}</div>}
                                </div>
                                <div className='card-action center'>
                                    {/* Submit button */}
                                    <button type='submit' className='btn'>Valider</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default Login;