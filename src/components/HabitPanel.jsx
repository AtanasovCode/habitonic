import styled from "styled-components";
import { Link } from "react-router-dom";
import { iconMap } from "./Utils";

import {
    House,
    ListChecks,
    X,
} from "@phosphor-icons/react";
import HabitPhoto from "./HabitPhoto";

const HabitPanel = ({ 
    title, 
    togglePhotoSelect, 
    currentHabit,
    togglePanel,
    showPanel,
}) => {
    return (
        <Container $active={showPanel}>
            <Wrapper>
                <HabitPhoto
                    background="#7654ef"
                    icon={iconMap[currentHabit?.icon]}
                    togglePhotoSelect={togglePhotoSelect}
                />
                <Title>
                    {title}
                </Title>
            </Wrapper>
            <Navigation>
                <NavItem to="/">
                    <IconContainer>
                        <Icon>
                            <ListChecks
                                weight="fill"
                                color="#fff"
                                size="100%"
                            />
                        </Icon>
                    </IconContainer>
                    <NavName>Habits</NavName>
                </NavItem>
            </Navigation>
        </Container>
    );
}

export default HabitPanel;

const Container = styled.div`
    background-color: ${props => props.theme.background};
    width: 30%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-top: 2.5rem;

    @media (max-width: 1300px) {
        width: 100%;
        height: auto;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 2rem;
        padding-bottom: 0;
        margin-bottom: .5rem;
    }

    @media (max-width: 768px) {
        padding: 1.5rem;
    }

    @media (max-width: 550px) {
        padding: 1rem;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 1300px) {
        width: auto;
        flex-direction: row;
        justify-content: flex-start;
    }
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1rem;

    @media (max-width: 1300px) {
        margin: 0;
        margin-left: 1rem;
        width: auto;
    }

    @media (max-width: 550px) {
        font-size: 1rem;
    }
`;

const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    @media (max-width: 1300px) {
        width: auto;
        height: 100%;
        flex-direction: row;
        justify-content: center;
    }
`;

const NavItem = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    width: 100%;

    @media (max-width: 1300px) {
        margin: 0 .5rem;
    }

    @media (max-width: 550px) {
        margin: 0 .25rem;
    }
`;

const IconContainer = styled.div`
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1300px) {
        margin-right: 0;
    }
`;

const Icon = styled.div`
    width: 30px;
    height: 30px;

    @media (max-width: 550px) {
        width: 24px;
        height: 24px;
    }
`;

const NavName = styled.div`
    font-size: 1.1rem;
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1300px) {
        visibility: hidden;
        display: none;
        width: 0;
        height: 0;
    }
`;
