import styled from "styled-components";
import { Placeholder } from "@phosphor-icons/react";

const HabitPhoto = ({
    icon,
    background,
    togglePhotoSelect,
    currentHabit,
}) => {
    
    return (
        <Container $background={background} onClick={() => togglePhotoSelect()}>
            <Icon>
                {
                    icon ?
                        icon
                        :
                        <Placeholder size="100%" weight="fill" color="#FFF" />
                }
            </Icon>
        </Container>
    );
}

export default HabitPhoto;

const Container = styled.div`
    width: 100%;
    min-width: 100px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${props => props.theme.secondary};
    transition: all .3s ease-in-out;

    &:hover::before {
        content: 'Change';
        transition: all .3s ease-in-out;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        border: 1px solid #ccc;
        backdrop-filter: blur(5px);
    }

    @media (max-width: 1024px) {
        width: 30%;
        min-width: 65px;
    }

    @media (max-width: 768px) {
        width: 20%;
    }

    @media (max-width: 550px) {
        width: 10%;
    }
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
`;