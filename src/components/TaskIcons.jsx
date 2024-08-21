import { Link } from 'react-router-dom';
import styled from "styled-components";

import {
    TrashSimple,
    Star,
    PresentationChart,
    X,
} from "@phosphor-icons/react";


const TaskIcons = ({
    complete,
    important,
    makeImportant,
    handleMoreInfo,
    id,
    trashTask,
    trash,
    toggleIcons,
    name,
}) => {

    return (
        <IconsContainer>
            {/*if the task is complete, you cannot make the task important*/}
            <TaskName>
                {name}
                <CloseIcon onClick={() => toggleIcons()} >
                    <X
                        weight="regular"
                        size={24}
                        color="#fff"
                    />
                </CloseIcon>
            </TaskName>
            <Icons>
                <TaskIcon onClick={() => {
                    !complete && makeImportant(id);
                    toggleIcons();
                }}>
                    <Star
                        weight={important ? "fill" : "light"}
                        color="#fff"
                        size={24}
                    />
                    <IconDescription>
                        Mark as important
                    </IconDescription>
                </TaskIcon>
                <TaskIcon>
                    <PresentationChart
                        weight="regular"
                        color="#fff"
                        size={24}
                    />
                    <IconDescription>
                        View stats
                    </IconDescription>
                </TaskIcon>
                <TaskIcon onClick={() => trashTask(id)}>
                    <TrashSimple
                        weight={trash ? "fill" : "light"}
                        color="#fff"
                        size={24}
                    />
                    <IconDescription>
                        Delete habit
                    </IconDescription>
                </TaskIcon>
            </Icons>
        </IconsContainer>
    );
}

export default TaskIcons;

const IconsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
    padding: 1rem;
    position: fixed;
    width: 30%;
    top: 50%;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 16px;

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

const TaskName = styled.div`
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${props => props.theme.text};
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TaskIcon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    padding: .5rem 1rem;
    background-color: #082f49;
    border-radius: 16px;
`;

const Icons = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconDescription = styled.div`
    font-size: 1rem;
    margin-left: .5rem;
`;

const CloseIcon = styled.div`
    position: absolute;
    right: 5%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;