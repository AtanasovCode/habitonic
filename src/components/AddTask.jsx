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
                            maxLength={30}
                            placeholder="Add new habit"
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
                            Delete Habits
                        </RemoveTasksText>
                    </RemoveTasks>
            }
        </Container>
    );
}

export default AddTask;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
    z-index: 6;
    padding: .6rem 0;
`;

const Add = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.secondary};
    border-radius: ${props => props.theme.borderRadius};
`;

const InputIcon = styled.div`
    margin-right: 1rem;
    cursor: pointer;
`;

const InputTask = styled.input`
    background-color: transparent;
    color: ${props => props.theme.text};
    border: none;
    font-size: 1rem;
    width: 100%;
    outline: none;

    &::placeholder {
        color: #c0bbbb;
        opacity: 1; /* Firefox */
    }

    &::-ms-input-placeholder { /* Edge 12 -18 */
        color: #c0bbbb;
    }
`;

const RemoveTasks = styled.div`
    width: 40%;
    border-radius: ${props => props.theme.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.text};

    &:hover {
        background-color: #353535;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const RemoveTasksText = styled.div`
    margin-left: 1rem;
`;