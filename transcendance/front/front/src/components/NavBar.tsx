import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import UserLogo from "../../public/assets/utilisateur.svg";
import Logout from "../../public/assets/deconnexion.svg";
import Mess from "../../public/assets/messager.svg";
import Params from "../../public/assets/parametres.svg";

const StyledFormContainer = styled.div`
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: rgba(0, 19, 43, 1);
    box-shadow: inset 0 2px 5px rgb(0, 217, 224);
    
    &:before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        box-shadow:
        0 5px 10px rgb(240, 7, 129),
        0 5px 10px rgb(0, 217, 224),
        0px 0 10px rgb(0, 217, 224);
        background: linear-gradient(0deg,
        rgba(255, 30, 146, 0.7) 0%, 
        rgba(255, 255, 255, 0.8) 70%,
        rgba(162, 224, 226, 1) 75%);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        z-index: -1;
    }
    
`;

// Styled component for the navigation bar container
const StyledNavBar = styled.nav`
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    position: relative;
    z-index: 0;

    @media (max-width: 768px) {
    flex-direction: column;
    }

`;

// Update your StyledNavButton with neon styles
const StyledNavButton = styled.button`
    cursor: pointer;
    color: var(--clr-neon);
    border: var(--clr-neon) 2px solid;
    padding: 5px;
    border-radius: 5px;
    box-shadow: inset 0 0 10px 0 var(--clr-neon), 0 0 10px 0 var(--clr-neon);
    position: relative;

    &:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 0 2em 0.5em var(--clr-neon);
        opacity: 0;
        background-color: var(--clr-neon);
        z-index: -1;
        transition: opacity 100ms linear;
    }
    &:hover, &:focus {
        color: var(--clr-bg);
        text-shadow: none;
    }
    &:hover:after, &:focus:after {
        opacity: 1;
    }
`;

// Navigation bar component
const NavBar = () => {
    return (
        <StyledFormContainer>
            <StyledNavBar>
                <StyledNavButton>
                    <Image src={UserLogo} alt='User Logo' width={24} height={24} />
                </StyledNavButton>
                <StyledNavButton>
                    <Image src={Mess} alt='Messagerie' width={24} height={24} />
                </StyledNavButton>
                <StyledNavButton>
                    <Image src={Params} alt='Parametre' width={24} height={24} />
                </StyledNavButton>
                <StyledNavButton>
                    <Image src={Logout} alt='Logout' width={24} height={24} />
                </StyledNavButton>
            </StyledNavBar>
        </StyledFormContainer>
    );
};

export default NavBar;
