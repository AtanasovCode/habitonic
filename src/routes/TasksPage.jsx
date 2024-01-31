import { useState } from 'react';
import styled from 'styled-components';

//a package that generates secure random values
//used for providing unique IDs for each of the tasks
//example value generated: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
import { v4 as uuidv4 } from 'uuid';

//importing reusable components
import Task from '../components/Task';
import SideBar from '../components/SideBar';
import AddTask from '../components/AddTask';
import RecentDates from '../components/RecentDates';

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
            <SideBar
                filter={filter}
                handleFilterChange={handleFilterChange}
            />
            <TasksContainer>
                <TaskHeading>
                    <TaskHeadingWrapper>
                        <TaskHeadingIcon>
                            {getFilterIcon()}
                        </TaskHeadingIcon>
                        <TaskTitle>
                            {filter}
                        </TaskTitle>
                    </TaskHeadingWrapper>
                    <RecentDates />
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
                            <NoTasksContainer>
                                <Placeholder
                                    weight="light"
                                    size={24}
                                    color="darkgray"
                                />
                                <NoTasksText>
                                    No tasks found
                                </NoTasksText>
                            </NoTasksContainer>
                    }
                </Tasks>
                <AddTask
                    filter={filter}
                    handleAddTask={handleAddTask}
                    handleAddEnter={handleAddEnter}
                    deleteTasks={deleteTasks}
                    name={name}
                    setName={setName}
                />
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
    justify-content: space-between;
`;

const TaskHeadingWrapper = styled.div`
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

const NoTasksContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: darkgray;
`;

const NoTasksText = styled.div`
    margin-left: .5rem;
`;