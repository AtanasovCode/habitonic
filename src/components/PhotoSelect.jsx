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
    X,
} from "@phosphor-icons/react";

const PhotoSelect = ({ setIcon, togglePhotoSelect }) => {

    const icons = [
        // Fitness Icons
        <Barbell weight="fill" color="#eee" size="100%" />,
        <PersonSimpleBike weight="fill" color="#eee" size="100%" />,
        <PersonSimpleRun weight="fill" color="#eee" size="100%" />,
        <PersonSimpleHike weight="fill" color="#eee" size="100%" />,
        <PersonSimpleSwim weight="fill" color="#eee" size="100%" />,
        <PersonSimpleTaiChi weight="fill" color="#eee" size="100%" />,
        // Hobbies Icons
        <GameController weight="fill" color="#eee" size="100%" />,
        <Checkerboard weight="regular" color="#eee" size="100%" />,
        <ChefHat weight="fill" color="#eee" size="100%" />,
        <CookingPot weight="fill" color="#eee" size="100%" />,
        <Sailboat weight="fill" color="#eee" size="100%" />,
        //Sports
        <SoccerBall weight="regular" color="#eee" size="100%" />,
        <Football weight="fill" color="#eee" size="100%" />,
        <Basketball weight="fill" color="#eee" size="100%" />,
        <Golf weight="fill" color="#eee" size="100%" />,
        <Racquet weight="fill" color="#eee" size="100%" />,
        // Learning Icons
        <Books weight="fill" color="#eee" size="100%" />,
        <BookOpenText weight="fill" color="#eee" size="100%" />,
        <Code weight="fill" color="#eee" size="100%" />,
        // Achievement Icons
        <ShootingStar weight="fill" color="#eee" size="100%" />,
        <RocketLaunch weight="fill" color="#eee" size="100%" />,
        <Fire weight="fill" color="#eee" size="100%" />,
        <Alarm weight="fill" color="#eee" size="100%" />,
        <ShoppingBag weight="fill" color="#eee" size="100%" />,
    ];


    return (
        <Container>
            <Title>Select Habit Icon</Title>
            <CloseIcon onClick={() => togglePhotoSelect()}>
                <X size={26} weight="regular" color="#FFF" />
            </CloseIcon>
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
    justify-content: center;
    color: ${props => props.theme.text};
    z-index: 9999;
    width: 40%;
    border-radius: 32px;

    animation: fade .4s ease-in-out;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @media (max-width: 1200px) {
        width: 50%;
    }

    @media (max-width: 1024px) {
        width: 60%;
    }

    @media (max-width: 768px) {
        width: 70%;
        padding: 1rem;
    }

    @media (max-width: 550px) {
        width: 95%;
    }
`;

const Title = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
`;

const SelectContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, 8%);
    grid-gap: 1rem;
    align-content: center;
    align-items: center;
    justify-content: center;

    
    @media (max-width: 550px) {
        grid-template-columns: repeat(6, 10%);
    }
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CloseIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;
`;