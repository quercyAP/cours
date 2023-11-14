import { useState, FormEvent } from 'react';
import styled from 'styled-components';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onLoginFailure: (error: string) => void;
}

// Style pour le conteneur du formulaire avec l'effet glow et le gradient
const StyledFormContainer = styled.div`
  position: absolute;
  padding: 1vh;
  border-radius: 20px;
  background: rgba(0, 19, 43 ,0.9);
  box-shadow: 
    inset 0 2px 5px var(--clr-neon),
    0 -2px 5px var(--clr-neon),
    inset 0 -3px 5px 0.5px rgb(0, 217, 224);


  @media (max-width: 425px) {
    width: 50vw;
  }

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    box-shadow:
      0 2px 5px rgb(0, 217, 224),
      0 2px 5px rgb(0, 217, 224),
      0px 0 30px rgb(255, 20, 189);
    background: linear-gradient(150deg,
      rgba(255, 20, 189, 0.7) 0%,
      rgba(255, 20, 189, 1) 30%, 
      rgba(255, 255, 255, 0.8) 70%,
      rgba(162, 224, 226, 1) 75%);
    border-radius: 20px;
    z-index: -1;
  }

`;

// Style pour le formulaire sans bordure pour permettre à la bordure du conteneur de briller à travers
const StyledForm = styled.form`
  display: flex;
  padding-left: 1vw;
  padding-right: 1vw;
  padding-bottom: 10px;
  min-height: 25vh;
  position: relative;
  width: 15vw;
  z-index: 0;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 33vw;
  }

  @media (max-width: 1024px) {
    width: 25vw;
  }
`;

// Style pour les champs de saisie avec l'effet de gradient sur le focus
const StyledInput = styled.input`
  background: transparent;
  border: 2px solid rgba(105, 250, 255, 1);
  border-radius: 10px;
  color: #ffeab5;
  padding: 5px;
  
  @media (max-width: 425px) {
    width: 44vw;
  }

  &:focus {
    outline: none;
    border: 2px solid rgba(255, 30, 146, 0.8);
  }
`;

// Style pour les labels
const StyledLabel = styled.label`
  color: #ffeab5;
  padding-top: 1vh;
  margin: 0.3vh 0;
`;

// Style pour les boutons avec l'effet de gradient
const StyledButton = styled.button`
  cursor: pointer;
  color: #ffeab5;
  font-size: 1em;
  margin-top: 3vh;
  border: var(--clr-neon) 2px solid;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px 0 var(--clr-neon), 0 0 10px 0 var(--clr-neon);
  position: relative;

  &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 5px;
      box-shadow: 0 0 2em 0.5em var(--clr-neon);
      opacity: 0;
      background-color: var(--clr-neon);
      z-index: -1;
      transition: opacity 100ms linear;
  }
  &:hover {
      color: var(--clr-bg);
      text-shadow: none;
  }
  &:hover:after {
      opacity: 1;
  }

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
