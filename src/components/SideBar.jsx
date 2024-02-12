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
            <CloseContainer onClick={() => toggleNavBar()}>
                <X
                    size={26}
                    color="#DDD"
                    weight="regular"
                />
            </CloseContainer>
            <Logo src={logo} alt="logo" />
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
            <Links>
                <BackLink to="/">
                    <House
                        color="#FFF"
                        weight="regular"
                        size={23}
                    />
                    <BackText>
                        Home
                    </BackText>
                </BackLink>
            </Links>
        </Container>
    );
}

export default SideBar;

const Container = styled.div`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    min-height: 100vh;
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-right-radius: ${props => props.theme.borderRadius};
    border-bottom-right-radius: ${props => props.theme.borderRadius};
    transition: all .3s ease;

    @media (max-width: 1024px) {
        position: fixed;
        top: 0;
        left: -100%;
        width: 50%;
        
        ${props => props.$active && `
            left: 0;
            z-index: 100;
        `}
    }

    @media (max-width: 675px) {
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

const Logo = styled.img`
    width: 80%;
    position: absolute;
    top: 5%;

    @media (max-width: 1024px) {
        top: 10%;
        width: 50%;
    }

    @media (max-width: 675px) {
        width: 50%;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    bottom: 1%;
    left: 0;

    @media (max-width: 675px) {
        bottom: 6%;
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
        display: inline-block;
        position: absolute;
        top: 2%;
        left: 2%;
        cursor: pointer;
    }
`;