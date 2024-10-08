//importing link for linking to the homepage
import { Link } from 'react-router-dom';
import styled from "styled-components";

import {
    ClipboardText,
    Star,
    ListChecks,
    Trash,
    ClockCountdown,
    X,
    Gauge,
    House,
} from '@phosphor-icons/react';

import Filter from "./Filter";

//importing the logo
import logo from '../assets/logo.svg';


const SideBar = ({
    filter,
    handleFilterChange,
    toggleNavBar,
    activeNavBar,
}) => {
    return (
        <Container $active={activeNavBar}>
            <LogoContainer>
                <Logo src={logo} alt="logo" />
                <CloseContainer onClick={() => toggleNavBar()}>
                    <X
                        size={26}
                        color="#DDD"
                        weight="regular"
                    />
                </CloseContainer>
            </LogoContainer>
            <Filters>
                <Filter
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    FilterIcon={ClipboardText}
                    filterName="all"
                />

                <Filter
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    FilterIcon={Star}
                    filterName="important"
                />

                <Filter
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    FilterIcon={ClockCountdown}
                    filterName="active"
                />

                <Filter
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    FilterIcon={ListChecks}
                    filterName="complete"
                />

                <Filter
                    filter={filter}
                    handleFilterChange={handleFilterChange}
                    FilterIcon={Trash}
                    filterName="trash"
                />
            </Filters>
        </Container>
    );
}

export default SideBar;

const Container = styled.div`
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};
    z-index: 10;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    border-top-right-radius: 32px;
    border-bottom-right-radius: 32px;
    transition: all .3s ease;
    padding: 2rem 0;
    width: 20%;

    @media (max-width: 1300px) {
        width: 25%;
    }

    @media (max-width: 1024px) {
        position: fixed;
        top: 0;
        left: -100%;
        width: 40%;
        
        ${props => props.$active && `
            left: 0;
            z-index: 100;
        `}
    }

    @media (max-width: 768px) {
        width: 50%;
    }

    @media (max-width: 550px) {
        width: 100%;
    }
`;

const Filters = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: column;
    justify-content: center;
`;

const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5rem;
`;

const Logo = styled.img`
    width: 70%;

    @media (max-width: 1024px) {
        width: 50%;
    }

    @media (max-width: 550px) {
        width: 45%;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    bottom: 1%;
    left: 0;

    @media (max-width: 550px) {
        bottom: 5%;
    }
`;

const BackLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.text};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const BackText = styled.div`
    margin-left: 1rem;
`;

const DashboardLink = styled(Link)`
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: ${props => props.theme.text};
`;

const DashboardIcon = styled.div`
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CloseContainer = styled.div`
    display: none;
    
    @media (max-width: 1024px) {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 4%;
        cursor: pointer;
    }
`;