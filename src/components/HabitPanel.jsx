import styled from "styled-components";
import { Link } from "react-router-dom";

import { House, ListChecks } from "@phosphor-icons/react";

const HabitPanel = ({ title }) => {
    return (
        <Container>
            <Wrapper>
                <Title>
                    {title}
                </Title>
            </Wrapper>
            <Navigation>
                <NavItem to="/habits">
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
                <NavItem to="/">
                    <IconContainer>
                        <Icon>
                            <House
                                weight="fill"
                                color="#fff"
                                size="100%"
                            />
                        </Icon>
                    </IconContainer>
                    <NavName>Home</NavName>
                </NavItem>
            </Navigation>
        </Container>
    );
}

export default HabitPanel;

const Container = styled.div`
    background-color: ${props => props.theme.background};
    width: 20%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-top: 2.5rem;

    @media (max-width: 768px) {
        padding: 2rem .2rem .5rem .2rem;
    }
`;

const Wrapper = styled.div``;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
`;

const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const NavItem = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    width: 100%;

    @media (max-width: 768px) {
        width: 90%;
        justify-content: center;
        background-color: ${props => props.theme.background};
        aspect-ratio: 1;
        margin-bottom: .3rem;
        border-radius: 50%;
    }

    @media (max-width: 550px) {
        width: 100%;
    }
`;

const IconContainer = styled.div`
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        margin-right: 0;
    }
`;

const Icon = styled.div`
    width: 30px;
    height: 30px;
`;

const NavName = styled.div`
    font-size: 1.1rem;
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
`;
