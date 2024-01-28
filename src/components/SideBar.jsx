//importing link for linking to the homepage
import { Link } from 'react-router-dom';
import styled from "styled-components";

import {
    ClipboardText,
    Star,
    ListChecks,
    Trash,
    ClockCountdown,
    ArrowLeft,
} from '@phosphor-icons/react';

import Filter from "./Filter";

//importing the logo
import logo from '../assets/logo.svg';


const SideBar = ({
    filter,
    handleFilterChange,
}) => {
    return (
        <Container>
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

                <BackLink to="/">
                    <ArrowLeft
                        color="#FFF"
                        weight="light"
                        size={23}
                    />
                    <BackText>
                        Go Back
                    </BackText>
                </BackLink>
            </Filters>
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
`;

const BackLink = styled(Link)`
    position: absolute;
    bottom: 0;
    text-decoration: none;
    color: ${props => props.theme.text};
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BackText = styled.div`
    margin-left: .5rem;
`;