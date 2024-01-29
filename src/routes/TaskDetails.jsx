import { useEffect, useState } from 'react';
import styled from 'styled-components';

//Link used to link back to tasks page
import { Link } from 'react-router-dom';

//importing icons
import {
    Star,
    FloppyDisk,
    ArrowLeft,
} from '@phosphor-icons/react';

const TaskDetails = ({
    tasks,
    setTasks,
}) => {

    //values used to update the tasks details
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        //when the page loads, set the above state to the task details
        tasks.map((task) => {
            if (task.id === sessionStorage.getItem("currentID")) {
                setName(task.name);
                setDescription(task.description);
                setDueDate(task.dueDate);
            }
        })
    }, [tasks])

    //function runs when the user clicks the update task button
    const updateTask = () => {
        //creates a new array and updates the values
        const updatedTasks = tasks.map((task) => {
            if (task.id === sessionStorage.getItem("currentID")) {
                return {
                    ...task,
                    name: name ? name : task.name,
                    description: description ? description : "",
                    dueDate: dueDate ? dueDate : "",
                };
            } else {
                return task; // Return the original task if the condition is not met
            }
        });

        //update the original tasks with the new updated tasks
        setTasks(updatedTasks);
    };

    return (
        <Container>
            <Heading>
                Edit your task
            </Heading>
            {
                tasks.map((task) => {
                    //if the task id matches the selected task id,
                    //display all the info about that task
                    if (task.id === sessionStorage.getItem("currentID")) {
                        return (
                            <TaskInfo key={task.id}>
                                <Task>
                                    <Title>
                                        Name
                                    </Title>
                                    <TaskInput
                                        type="text"
                                        value={name}
                                        maxLength={80}
                                        placeholder="Enter task name"
                                        className="task-name-input"
                                        onChange={(e) => setName(e.currentTarget.value)}
                                    />
                                </Task>
                                <Task>
                                    <Title>
                                        Description
                                    </Title>
                                    <Description
                                        name="desc"
                                        placeholder="Add task description"
                                        value={description}
                                        maxLength={150}
                                        onChange={(e) => setDescription(e.currentTarget.value)}
                                    ></Description>
                                </Task>
                                <Task>
                                    <Title>
                                        <StarContainer>
                                            <Star
                                                size={36}
                                                weight={task.important ? "fill" : "light"}
                                                color={task.important ? "#FFF" : "#AAA"}
                                            />
                                        </StarContainer>
                                        {task.important ? "Marked as important" : "Not marked as important"}
                                    </Title>
                                </Task>
                                <div className="task-change">
                                    <div className="task-change-title">
                                        Date Created
                                    </div>
                                    <div className="task-date-created">
                                        {task.dateCreated}
                                    </div>
                                </div>
                                <div className="task-change">
                                    <div className="task-change-title">
                                        Due Date
                                    </div>
                                    <div className="task-set-date">
                                        <input
                                            type="date"
                                            className="date-picker"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.currentTarget.value)}
                                        />
                                    </div>
                                    <div className="task-change-subtitle">
                                        Set a due-date for your task
                                    </div>
                                </div>
                                <div className="save-btn-container">
                                    <Link
                                        className="save-btn"
                                        onClick={() => updateTask()}
                                        to="../tasks"
                                    >
                                        <FloppyDisk
                                            weight="light"
                                            size={24}
                                            color="#000"
                                            className="btn-icon"
                                        />
                                        Save changes
                                    </Link>
                                    <Link
                                        className="save-btn details-back-btn"
                                        to="../tasks"
                                    >
                                        <ArrowLeft
                                            weight="light"
                                            size={24}
                                            color="#ccc"
                                            className="btn-icon"
                                        />
                                        Go back
                                    </Link>
                                </div>
                            </TaskInfo>
                        );
                    }
                })
            }
        </Container>
    );
}

export default TaskDetails;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 20;
    padding: 2rem 3rem;
    min-width: 40%;
`;

const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
`;

const TaskInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Task = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 2.5rem;
    width: 100%;
`;

const Title = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TaskInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    color: ${props => props.theme.text};
    font-size: 1rem;
    border-bottom: 1px solid #bbb;
    padding: .3rem .6rem;
`;

const Description = styled.textarea`
    border: 1px solid #bbb;
    color: ${props => props.theme.text};
    font-size: 1rem;
    resize: none;
    resize: none;
    padding: .3rem .6rem;
    background-color: transparent;
    width: 100%;
    height: 7rem;
`;

const StarContainer = styled.div`
    margin-right: 1rem;
`;