import { useState } from 'react';
import styled from 'styled-components';

import TaskIcons from './TaskIcons';

import { DotsThreeVertical } from '@phosphor-icons/react';

//reusable component for tasks
const Task = ({
    makeImportant,
    completeTask,
    handleMoreInfo,
    important,
    complete,
    name,
    id,
    trash,
    Star,
    Info,
    TrashSimple,
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
                showIcons && 
                <TaskIcons
                    important={important}
                    complete={complete}
                    id={id}
                    trashTask={trashTask}
                    makeImportant={makeImportant}
                    trash={trash}
                />
            }
            <MoreInfo onClick={() => toggleIcons()}>
                <DotsThreeVertical
                    weight="bold"
                    color="#FFF"
                    size={23}
                />
            </MoreInfo>
            <InfoContainer>
                <TaskName>
                    {name}
                </TaskName>
            </InfoContainer>
        </Container>
    );
}

export default Task;

const Container = styled.div`
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: ${props => props.theme.taskBackground};
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .4rem;
    transition: all .3s ease;
    position: relative;

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
    flex: 1;
`;

const MoreInfo = styled.div`
    margin-right: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const TaskName = styled.div`
    font-size: 1rem;
    width: 25%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;  /* Prevent line breaks */
    word-wrap: break-word;  /* Break words to prevent white space */
`;