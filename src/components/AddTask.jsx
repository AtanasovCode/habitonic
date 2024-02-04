import styled from "styled-components";

import {
    TrashSimple,
    Plus,
} from "@phosphor-icons/react";

const AddTask = ({
    filter,
    handleAddTask,
    handleAddEnter,
    deleteTasks,
    name,
    setName,
}) => {
    return (
        <Container>
            {
                //if the filter is set to trash, display a way to delete all trashed tasks
                //if the filter is set to anything else, display the input for more tasks
                filter !== "trash" ?
                    <Add>
                        <InputIcon onClick={() => handleAddTask()}>
                            <Plus
                                weight="light"
                                color="#fff"
                                size={22}
                            />
                        </InputIcon>
                        <InputTask
                            type="text"
                            maxLength={60} //max number of characters is set to 80
                            placeholder="Add a task"
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)} //update the state name
                            onKeyDown={(e) => handleAddEnter(e.key)} //runs when the a key is pressed
                        />
                    </Add>
                    :
                    <RemoveTasks onClick={() => deleteTasks()}>
                        {
                            /*
                            When this div is clicked, it runs a function that deletes all 
                            of the tasks that have been marked as trash
                            */
                        }
                        <TrashSimple
                            weight="light"
                            color="#FFF"
                            size={26}
                        />
                        <RemoveTasksText>
                            Remove Tasks
                        </RemoveTasksText>
                    </RemoveTasks>
            }
        </Container>
    );
}

export default AddTask;

const Container = styled.div`
    width: 100%;
    margin-left: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #141414;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 6;
    padding: 1rem 0;
`;

const Add = styled.div`
    width: 100%;
    margin: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
    padding: 1rem;

    @media (max-width: 1200px) {
        margin: 0 1rem;
    }


    @media (max-width: 1024px) {
        margin: 0 2.5rem;
    }

    @media (max-width: 675px) {
        margin: 0;
    }
`;

const InputIcon = styled.div`
    margin-right: 1rem;
    cursor: pointer;
`;

const InputTask = styled.input`
    background-color: transparent;
    color: ${props => props.theme.text};
    border: none;
    font-size: 16px;
    width: 100%;
    outline: none;
`;

const RemoveTasks = styled.div`
    width: 40%;
    border-radius: ${props => props.theme.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};

    &:hover {
        background-color: #353535;
    }
`;

const RemoveTasksText = styled.div`
    margin-left: 1rem;
`;