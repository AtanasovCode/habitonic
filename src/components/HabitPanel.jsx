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
                <NavItem>
                    <NavIcon>
                        <ListChecks
                            weight="fill"
                            color="#fff"
                            size={28}
                        />
                    </NavIcon>
                    <NavName>Habits</NavName>
                </NavItem>
                <NavItem>
                    <NavIcon>
                        <House
                            weight="fill"
                            color="#fff"
                            size={28}
                        />
                    </NavIcon>
                    <NavName>Home</NavName>
                </NavItem>
            </Navigation>
        </Container>
    );
}

export default HabitPanel;

const Container = styled.div`
    background-color: ${props => props.theme.secondary};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-top: 2.5rem;
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
    margin-bottom: .5rem;
    width: 100%;
`;

const NavIcon = styled.div`
    margin-right: .6rem;
`;

const NavName = styled.div`
    font-size: 1rem;
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
`;
