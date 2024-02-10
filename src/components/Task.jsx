import styled from 'styled-components';

import { Link } from 'react-router-dom';

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

    return (
        <Container
            $important={important}
            $complete={complete}
            key={id}
        >
            <InfoContainer>
                <TaskRadio 
                    $complete={complete}
                    onClick={() => completeTask(id)}
                />
                <TaskName>
                    {name}
                </TaskName>
            </InfoContainer>
            <Icons>
                {/*if the task is complete, you cannot make the task important*/}
                <TaskIcon onClick={() => !complete && makeImportant(id)}>
                    <Star
                        weight={important ? "fill" : "light"}
                        color="#fff"
                        size={20}
                    />
                </TaskIcon>
                <IconLink
                    to="/tasks/info"
                    onClick={() => handleMoreInfo(id)}
                >
                    <Info
                        weight="light"
                        color="#fff"
                        size={20}
                    />
                </IconLink>
                <TaskIcon onClick={() => trashTask(id)}>
                    <TrashSimple
                        weight={trash ? "fill" : "light"}
                        color="#fff"
                        size={20}
                    />
                </TaskIcon>
            </Icons>
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
    justify-content: center;
`;

const TaskRadio = styled.div`
    margin-right: 15px;
    width: 1.3rem;
    height: 1.3rem;
    min-width: 24px;
    background-color: transparent;
    border: 1px solid #ffffff90;
    border-radius: 50%;
    cursor: pointer;
    transition: all .3s ease;
    position: relative;
    transition: all .3s ease;

    &:hover {
        border: 1px solid #FFF;
    }

    &::before {
        content: '✓';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        font-weight: 900;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.theme.primary};
        border: none;
        transition: all .3s ease;

        opacity: ${props => props.$complete ? "1" : "0"};
    }
`;

const TaskName = styled.div`
    font-size: 1rem;
`;

const Icons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TaskIcon = styled.div`
    margin: .4rem;
    cursor: pointer;
`;

const IconLink = styled(Link)`
    margin: .4rem;
`;