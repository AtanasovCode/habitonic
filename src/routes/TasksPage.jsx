import { useState } from 'react';
import styled from 'styled-components';

//importing link for linking to the task details page
import { Link } from 'react-router-dom';

//importing the logo
import logo from '../assets/logo.svg';

//to deletes
import '../styles/tasks-page.css';

//a package that generates secure random values
//used for providing unique IDs for each of the tasks
//example value generated: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
import { v4 as uuidv4 } from 'uuid';

//importing reusable components
import Filter from '../components/Filter';
import Task from '../components/Task';

//importing icons from icons library
import {
    ClipboardText,
    Star,
    ClockCountdown,
    ListChecks,
    ArrowLeft,
    X,
    List,
    Plus,
    Info,
    TrashSimple,
    Placeholder,
    Trash,
} from '@phosphor-icons/react';

const TasksPage = ({
    //importing the props passed down from the Router component
    tasks,
    setTasks,
}) => {

    //used to control opening/closing of nav for mobile view
    const [navOpen, setNavOpen] = useState(false);
    const [tint, setTint] = useState(false);
    //used to see which filter is currently selected, default is 'all'
    const [filter, setFilter] = useState("all");
    //the name of the task
    const [name, setName] = useState("");

    //open/close mobile nav
    const handleNavOpen = () => {
        setNavOpen(!navOpen);
        setTint(!tint);
    }

    //sets the filter
    const handleFilterChange = (filter) => {
        setFilter(filter);

        if (navOpen) handleNavOpen();
    }

    //when function is called it adds the task to the tasks array
    const handleAddTask = () => {
        if (name !== "") {
            const newTask = {
                name: name,
                complete: false,
                id: uuidv4(), //generates random secure value
                important: false,
                description: "",
                dueDate: "",
                dateCreated: new Date().toLocaleDateString('en-GB'), //generates the current date
                trash: false,
            };

            // Separate important tasks from non-important tasks
            const importantTasks = tasks.filter((task) => task.important);
            const nonImportantTasks = tasks.filter((task) => !task.important);

            // Add the new task below the important tasks, but above the non-important tasks
            const updatedTasks = [...importantTasks, newTask, ...nonImportantTasks];

            // Update the state with the new array of tasks
            setTasks(updatedTasks);

            setName("");
        }
    };

    //when the enter key is pressed, function runs and adds the task
    const handleAddEnter = (key) => {
        if (key === "Enter") {
            handleAddTask();
        }
    }

    //functin runs when the user clicks to make the task important
    const makeImportant = (id) => {
        //create a new array with updated tasks, marking the task with the given id as important
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, important: !task.important } : task
        );

        //sort the updatedTasks array to move tasks with important=true to the top
        updatedTasks.sort((a, b) => (a.important === b.important ? 0 : a.important ? -1 : 1));

        //update the state with the new array of tasks
        setTasks(updatedTasks);
    };

    //function to run when the user clicks to mark a task as complete
    const completeTask = (id) => {
        //create a new array with updated tasks, marking the task with the given id as complete
        //if the task has important=true, set it to false
        const updatedTasks = tasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    complete: !task.complete,
                    important: task.important ? false : task.important,
                }
                : task
        );

        //sort the updatedTasks array to move tasks completed to the bottom
        updatedTasks.sort((a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1));

        //update the state with the new array of tasks
        setTasks(updatedTasks);
    }

    //function that runs when the user moves a task to the trash
    const trashTask = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, trash: !task.trash } : task
        );

        //update the state with the new array of tasks
        setTasks(updatedTasks);
    }

    const deleteTasks = () => {
        const updatedTasks = tasks.filter((task) => !task.trash);

        setTasks(updatedTasks);
    }

    //when the user clicks to see more info on a task
    //save that task id to session storage
    const handleMoreInfo = (id) => {
        sessionStorage.setItem("currentID", id);
    }

    //render the tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') {
            return !task.trash;
        } else if (filter === 'important') {
            return task.important && !task.trash;
        } else if (filter === 'active') {
            return !task.complete && !task.trash;
        } else if (filter === 'complete') {
            return task.complete && !task.trash;
        } else if (filter === "trash") {
            return task.trash;
        }
        return false;
    });

    const getFilterIcon = () => {
        switch (filter) {
            case "all": return <ClipboardText size={32} color="#FFF" weight="light" />;
            case "important": return <Star size={32} color="#FFF" weight="light" />;
            case "trash": return <Trash size={32} color="#FFF" weight="light" />;
            case "complete": return <ListChecks size={32} color="#FFF" weight="light" />;
            case "active": return <ClockCountdown size={32} color="#FFF" weight="light" />;
        }
    }

    return (
        <Container>
            <Sidebar>
                <Logo src={logo} alt="logo" />
                <div className="filter-container">
                    <Filter
                        filter={filter}
                        handleFilterChange={handleFilterChange}
                        FilterIcon={ClipboardText}
                        filterName="all"
                    />

                    <Filter
                        filter={filter}
                        handleFilterChange={handleFilterChange}
                        FilterIcon={Star}
                        filterName="important"
                    />

                    <Filter
                        filter={filter}
                        handleFilterChange={handleFilterChange}
                        FilterIcon={ClockCountdown}
                        filterName="active"
                    />

                    <Filter
                        filter={filter}
                        handleFilterChange={handleFilterChange}
                        FilterIcon={ListChecks}
                        filterName="complete"
                    />

                    <Filter
                        filter={filter}
                        handleFilterChange={handleFilterChange}
                        FilterIcon={Trash}
                        filterName="trash"
                    />

                    <Link to="/" className="filter back-btn">
                        <div className="filter-icon">
                            <ArrowLeft
                                color="rgb(148, 0, 211)"
                                weight="light"
                                size={32}
                            />
                        </div>
                        <div className="filter-name">
                            Go Back
                        </div>
                    </Link>
                </div>
            </Sidebar>
            <TasksContainer>
                <TaskHeading>
                    <TaskHeadingIcon>
                        {getFilterIcon()}
                    </TaskHeadingIcon>
                    <TaskTitle>
                        {filter}
                    </TaskTitle>
                </TaskHeading>
                <Tasks>
                    {
                        //If the array is empty, display on the screen that there are no tasks to show
                        filteredTasks.length ?
                            filteredTasks.map((task) => {
                                return (
                                    <Task
                                        key={task.id}
                                        filter={filter}
                                        makeImportant={makeImportant}
                                        completeTask={completeTask}
                                        handleMoreInfo={handleMoreInfo}
                                        important={task.important}
                                        complete={task.complete}
                                        name={task.name}
                                        id={task.id}
                                        trash={task.trash}
                                        Star={Star}
                                        Info={Info}
                                        TrashSimple={TrashSimple}
                                        trashTask={trashTask}
                                    />
                                )
                            })
                            :
                            <div className="empty-tasks-container">
                                <Placeholder weight="light" size={24} color="darkgray" />
                                <div className="empty-tasks-heading">
                                    No tasks found
                                </div>
                            </div>
                    }
                </Tasks>
                <AddTaskContainer>
                    {
                        //if the filter is set to trash, display a way to delete all trashed tasks
                        //if the filter is set to anything else, display the input for more tasks
                        filter !== "trash" ?
                            <AddTask>
                                <InputIcon onClick={() => handleAddTask()}>
                                    <Plus
                                        weight="light"
                                        color="#fff"
                                        size={22}
                                    />
                                </InputIcon>
                                <InputTask
                                    type="text"
                                    maxLength={80} //max number of characters is set to 80
                                    placeholder="Add a task"
                                    value={name}
                                    onChange={(e) => setName(e.currentTarget.value)} //update the state name
                                    onKeyDown={(e) => handleAddEnter(e.key)} //runs when the a key is pressed
                                />
                            </AddTask>
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
                </AddTaskContainer>
            </TasksContainer>
        </Container>
    );
}

export default TasksPage;

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
`;

const Sidebar = styled.div`
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    min-height: 100vh;
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-right-radius: ${props => props.theme.borderRadius};
    border-bottom-right-radius: ${props => props.theme.borderRadius};
    transition: all .3s ease;
`;

const Logo = styled.img`
    width: 80%;
    position: absolute;
    top: 5%;
`;

const TasksContainer = styled.div`
    min-height: 100vh;
    width: 80%;
    margin-left: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #141414;
    padding: 2rem 3rem;
`;

const TaskHeading = styled.div`
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const TaskHeadingIcon = styled.div`
    margin-right: 1rem;
`;

const TaskTitle = styled.div`
    font-size: 2rem;
    font-weight: 700;
    text-transform: capitalize;
`;

const Tasks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const AddTaskContainer = styled.div`
    width: 80%;
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

const AddTask = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
    padding: 1rem;
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