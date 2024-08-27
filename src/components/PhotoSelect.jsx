import { useState } from "react";
import styled from "styled-components";

import {
    Barbell,
    ShootingStar,
    PersonSimpleBike,
    PersonSimpleRun,
    PersonSimpleHike,
    PersonSimpleSwim,
    PersonSimpleTaiChi,
    Code,
    GameController,
    Checkerboard,
    ChefHat,
    CookingPot,
    ShoppingBag,
    Sailboat,
    Rocket,
    RocketLaunch,
    Alarm,
    Books,
    BookOpenText,
    Basketball,
    Football,
    SoccerBall,
    Golf,
    Fire,
    Racquet,
} from "@phosphor-icons/react";

const PhotoSelect = ({ setIcon, togglePhotoSelect }) => {

    const icons = [
        // Fitness Icons
        <Barbell weight="regular" color="#ccc" size="100%" />,
        <PersonSimpleBike weight="fill" color="#ccc" size="100%" />,
        <PersonSimpleRun weight="fill" color="#ccc" size="100%" />,
        <PersonSimpleHike weight="fill" color="#ccc" size="100%" />,
        <PersonSimpleSwim weight="fill" color="#ccc" size="100%" />,
        <PersonSimpleTaiChi weight="fill" color="#ccc" size="100%" />,
        // Hobbies Icons
        <GameController weight="fill" color="#ccc" size="100%" />,
        <Checkerboard weight="regular" color="#ccc" size="100%" />,
        <ChefHat weight="fill" color="#ccc" size="100%" />,
        <CookingPot weight="fill" color="#ccc" size="100%" />,
        <Sailboat weight="fill" color="#ccc" size="100%" />,
        //Sports
        <SoccerBall weight="regular" color="#ccc" size="100%" />,
        <Football weight="fill" color="#ccc" size="100%" />,
        <Basketball weight="fill" color="#ccc" size="100%" />,
        <Golf weight="fill" color="#ccc" size="100%" />,
        <Racquet weight="fill" color="#ccc" size="100%" />,
        // Learning Icons
        <Books weight="fill" color="#ccc" size="100%" />,
        <BookOpenText weight="fill" color="#ccc" size="100%" />,
        <Code weight="fill" color="#ccc" size="100%" />,
        // Achievement Icons
        <ShootingStar weight="fill" color="#ccc" size="100%" />,
        <RocketLaunch weight="fill" color="#ccc" size="100%" />,
        <Rocket weight="fill" color="#ccc" size="100%" />,
        <Fire weight="fill" color="#ccc" size="100%" />,
        <Alarm weight="fill" color="#ccc" size="100%" />,
        <ShoppingBag weight="fill" color="#ccc" size="100%" />,
    ];


    return (
        <Container>
            <Title>Select Habit Icon</Title>
            <SelectContainer>
                {
                    icons.map((item, index) => {
                        return (
                            <Item key={index}>
                                {item}
                            </Item>
                        )
                    })
                }
            </SelectContainer>
        </Container>
    );
}

export default PhotoSelect;

const Container = styled.div`
    position: fixed;
    background-color: ${props => props.theme.background};
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: ${props => props.theme.text};
    z-index: 9999;
    width: 50%;

    animation: fade .4s ease-in-out;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`;

const Title = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 700;
`;

const SelectContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 1rem;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;