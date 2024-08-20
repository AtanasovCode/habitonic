import { useState } from 'react';
import styled from 'styled-components';

import TaskIcons from './TaskIcons';
import Tracker from './Tracker';

import { DotsThreeVertical } from '@phosphor-icons/react';

//reusable component for tasks
const Task = ({
    makeImportant,
    dates,
    important,
    complete,
    name,
    id,
    markComplete,
    trash,
    trashTask,
}) => {

    const [showIcons, setShowIcons] = useState(false);

    const toggleIcons = () => {
        setShowIcons(!showIcons);
    }

    return (
        <Container
            $important={important}
            $complete={complete}
            key={id}
        >
            {
                showIcons && (
                    <>
                        <TaskIcons
                            important={important}
                            complete={complete}
                            id={id}
                            trashTask={trashTask}
                            makeImportant={makeImportant}
                            trash={trash}
                            toggleIcons={toggleIcons}
                            name={name}
                        />
                        <Tint onClick={() => toggleIcons()} />
                    </>
                )
            }
            <InfoContainer>
                <MoreInfo onClick={() => toggleIcons()}>
                    <DotsThreeVertical
                        weight="bold"
                        color="#AAA"
                        size={23}
                    />
                </MoreInfo>
                <TaskName>
                    {name}
                </TaskName>
            </InfoContainer>
            <Tracker id={id} dates={dates} markComplete={markComplete} />
        </Container>
    );
}

export default Task;

const Container = styled.div`
    width: 100%;
    padding: 1rem;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
    transition: all .3s ease;
    border-radius: ${props => props.theme.borderRadius};

    @media (max-width: 550px) {
        padding: 1rem .5rem;
    }

    ${props => props.$important && `
        background-color: ${props.theme.taskImportant};
        font-weight: 700;
    `}

    ${props => props.$complete && `
        text-decoration: line-through;
        color: #a2a2a2;
        background-color: ${props.theme.taskComplete};
    `}
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40%;

    @media (max-width: 768px) {
        width: 45%;
    }

    @media (max-width: 550px) {
        width: 50%;
    }
`;

const MoreInfo = styled.div`
    margin-right: .3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const TaskName = styled.div`
    font-size: 1rem;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;  /* Break words to prevent white space */
    
    @media (max-width: 768px) {
        font-size: .9rem;
    }

    @media (max-width: 550px) {
        font-size: .8rem;
    }
`;

const Tint = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
    z-index: 99;

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