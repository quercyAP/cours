import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import css from '../styles/LoginForm.module.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onLoginFailure: (error: string) => void;
}

// Style pour le conteneur du formulaire avec l'effet glow et le gradient
const StyledFormContainer = styled.div`
  position: absolute;
  left: 30%;
  top: 50px;
  padding: 1rem;
  border-radius: 20px;
  height: 100%;

  background: rgba(1, 34, 71,0.8);
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    box-shadow:
      0 5px 10px rgb(0, 217, 224),
      0 5px 10px rgb(0, 217, 224),
      0px 0 30px rgb(240, 7, 129);
    background: linear-gradient(150deg,
      rgba(255, 30, 146, 0.7) 0%, 
      rgba(255, 255, 255, 0.8) 70%,
      rgba(162, 224, 226, 1) 75%);
    border-radius: 20px;
    z-index: -1;
  }

`;

// Style pour le formulaire sans bordure pour permettre à la bordure du conteneur de briller à travers
const StyledForm = styled.form`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  width: 300px;
  flex-direction: column;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    box-shadow:
      0 5px 10px rgba(0, 217, 224, 0.1),
      0 5px 10px rgba(0, 217, 224, 0.1),
      0px 0 30px rgba(240, 7, 129, 0.1);
    background: linear-gradient(150deg,
      rgba(255, 30, 146, 0.7) 0%, 
      rgba(255, 255, 255, 0.8) 70%,
      rgba(162, 224, 226, 1) 75%);
    border-radius: 20px;
    z-index: -1;
  }
`;

// Style pour les champs de saisie avec l'effet de gradient sur le focus
const StyledInput = styled.input`
  background: transparent;
  border: 2px solid rgba(105, 250, 255, 1);
  border-radius: 10px;
  color: #ffeab5;
  padding: 5px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid rgba(255, 30, 146, 0.8);
  }
`;

// Style pour les labels
const StyledLabel = styled.label`
  color: #ffeab5;
  margin: 0.3rem 0;
`;

// Style pour les boutons avec l'effet de gradient
const StyledButton = styled.button`
  background: rgba(105, 250, 255, 0.7);
  color: #ffeab5;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;

`;


const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Ici, vous pouvez intégrer l'authentification avec votre backend
      console.log('Connexion en cours avec', username, password);
      // Simulez une réponse de connexion réussie
      onLoginSuccess();
    } catch (error) {
      onLoginFailure('Échec de la connexion');
    }
  };

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="username">Username:</StyledLabel>
        <StyledInput
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default LoginForm;
