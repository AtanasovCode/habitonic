import { Link } from 'react-router-dom';
import styled from "styled-components";

import {
    TrashSimple,
    Star,
    Info,
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
                    <IconDescription>
                        Mark as important
                    </IconDescription>
                    <Star
                        weight={important ? "fill" : "light"}
                        color="#fff"
                        size={24}
                    />
                </TaskIcon>

                <TaskIcon onClick={() => trashTask(id)}>
                    <IconDescription>
                        Delete habit
                    </IconDescription>
                    <TrashSimple
                        weight={trash ? "fill" : "light"}
                        color="#fff"
                        size={24}
                    />
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

const Icons = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconDescription = styled.div`
    font-size: 1rem;
    margin-left: .5rem;
`;

const TaskIcon = styled.div`
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 1.5rem;
    border: 1px solid #fff;
`;

const IconLink = styled(Link)`
    margin: .4rem;
`;


const CloseIcon = styled.div`
    position: absolute;
    right: 5%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;