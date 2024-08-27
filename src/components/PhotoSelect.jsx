import { useState, useEffect } from "react";
import styled from "styled-components";
import { iconMap } from "./Utils";

import {
    X,
} from "@phosphor-icons/react";

const PhotoSelect = ({
    tasks,
    setTasks,
    currentHabit,
    setCurrentHabit,
    togglePhotoSelect,
}) => {

    const changeHabitPhoto = (icon) => {
        const updatedIcon = icon;

        setCurrentHabit((prevHabit) => ({
            ...prevHabit,
            icon: updatedIcon,
        }));
        console.log("icon updated");
        togglePhotoSelect();
    }

    useEffect(() => {
        console.log(`currentHabit.icon: ${currentHabit.icon}`)
        const updatedTasks = tasks.map((task) => {
            if (task.id === currentHabit.id) {
                return { ...task, icon: currentHabit.icon };
            }
            return task; 
        });

        setTasks(updatedTasks);
    }, [currentHabit]);


    return (
        <Container>
            <Title>Select Habit Icon</Title>
            <CloseIcon onClick={() => togglePhotoSelect()}>
                <X size={26} weight="regular" color="#FFF" />
            </CloseIcon>
            <SelectContainer>
                {
                    Object.entries(iconMap).map(([key, IconComponent], index) => (
                        <Item key={index} onClick={() => changeHabitPhoto(key)}>
                            {IconComponent}
                        </Item>
                    ))
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
    cursor: pointer;
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