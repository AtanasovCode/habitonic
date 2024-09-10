import { useEffect, useState } from 'react';
import { format, differenceInDays, parse, subDays } from 'date-fns';
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
    Info,
    TrashSimple,
    Placeholder,
    Trash,
    List,
} from '@phosphor-icons/react';

const TasksPage = ({
    tasks,
    setTasks,
}) => {

    const [tint, setTint] = useState(false);
    const [activeNavBar, setActiveNavBar] = useState(false);
    //used to see which filter is currently selected, default is 'all'
    const [filter, setFilter] = useState("all");
    //the name of the task
    const [name, setName] = useState("");


    //sets the filter
    const handleFilterChange = (filter) => {
        setFilter(filter);
        setActiveNavBar(false);

    }

    const toggleNavBar = () => {
        setActiveNavBar(!activeNavBar);
    }

    useEffect(() => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map((task) => {
                const latest = task.dates ? task.dates[0]?.date : undefined;
                if (latest) {
                    const latestDate = parse(latest, "dd/MM/yyyy", new Date()); // parse to ensure correct format
                    const current = new Date();

                    //console.log("Latest Date:", latestDate);
                    //console.log("Current Date:", current);

                    if (!isNaN(latestDate)) {
                        const daysDifference = differenceInDays(current, latestDate);

                        if (daysDifference > 0) {
                            // Calculate missing dates
                            const missingDates = Array.from({ length: daysDifference }, (_, index) => {
                                const date = subDays(current, index);
                                return { date: format(date, "dd/MM/yyyy"), complete: false };
                            });

                            //console.log("Missing Dates Calculated:", missingDates);

                            // Update task's dates and log the new dates array
                            const updatedTask = {
                                ...task,
                                dates: [...missingDates, ...task.dates],
                            };

                            //console.log("Updated Task Dates:", updatedTask.dates);
                            return updatedTask;
                        }
                    }
                }
                return task;
            });

            //console.log("Final Updated Tasks with New Dates:", updatedTasks);
            return [...updatedTasks]; // Ensuring a new array reference is returned
        });
    }, []);

    //when function is called it adds the task to the tasks array
    const handleAddTask = () => {
        if (name) {
            const dates = Array.from({ length: 260 }, (_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - index);
                const formattedDate = format(date, "dd/MM/yyyy");
                return { date: formattedDate, complete: false };
            });

            const newTask = {
                name: name,
                complete: false,
                id: uuidv4(),
                important: false,
                description: "",
                dueDate: "",
                dateCreated: format(new Date(), "dd/MM/yyyy"),
                trash: false,
                dates: dates,
                icon: null,
            };

            const updatedTasks = [...tasks, newTask];
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

    //marks a task as complete on that specific date
    const markComplete = (id, dateComplete) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    dates: task.dates.map((item) =>
                        item.date === dateComplete
                            ? {
                                ...item,
                                complete: !item.complete,
                            }
                            : item
                    ),
                }
                : task
        );

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
    const filteredTasks = tasks.filter(habit => {
        const currentDate = format(new Date(), "dd/MM/yyyy");

        if (filter === 'all') {
            return !habit.trash;
        } else if (filter === 'important') {
            return habit.important && !habit.trash;
        } else if (filter === 'active' || filter === 'complete') {
            const todayEntry = habit.dates.find(entry => entry.date);
            return todayEntry && (filter === 'active' ? !todayEntry.complete : todayEntry.complete) && !habit.trash;
        } else if (filter === "trash") {
            return habit.trash;
        }
        return false;
    });

    const getFilterIcon = () => {
        switch (filter) {
            case "all": return <ClipboardText size="100%" color="#FFF" weight="fill" />;
            case "important": return <Star size="100%" color="#FFF" weight="fill" />;
            case "trash": return <Trash size="100%" color="#FFF" weight="fill" />;
            case "complete": return <ListChecks size="100%" color="#FFF" weight="fill" />;
            case "active": return <ClockCountdown size="100%" color="#FFF" weight="fill" />;
        }
    }

    return (
        <Container>
            <SideBar
                filter={filter}
                handleFilterChange={handleFilterChange}
                toggleNavBar={toggleNavBar}
                activeNavBar={activeNavBar}
            />
            <TasksContainer>
                <TaskHeading>
                    <TaskHeadingWrapper>
                        <MenuContainer onClick={() => toggleNavBar()}>
                            <List
                                size={26}
                                color="#DDD"
                                weight="regular"
                            />
                        </MenuContainer>
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
                                        dates={task.dates}
                                        markComplete={markComplete}
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
                                    No habits found
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
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.background};
    padding: 2rem 3rem;
    padding-bottom: 0;
    position: relative;

    @media (max-width: 1200px) {
        padding: 2rem 1rem;
    }

    @media (max-width: 1024px) {
        padding: 2rem 2.5rem;
    }

    @media (max-width: 768px) {
        padding: 1.5rem .5rem;
    }

    @media (max-width: 550px) {
        padding: .5rem;
    }
`;

const TaskHeading = styled.div`
    width: 100%;
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
    width: 32px;

    @media (max-width: 675px) {
        margin-right: .5rem;
        width: 26px;
    }
`;

const TaskTitle = styled.div`
    font-size: 2rem;
    font-weight: 700;
    text-transform: capitalize;

    @media (max-width: 675px) {
        font-size: 1.3rem;
    }
`;

const Tasks = styled.div`
    flex: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    overflow-y: auto;
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


const MenuContainer = styled.div`
    display: none;

    @media (max-width: 1024px) {
        display: inline-block;
        cursor: pointer;
        z-index: 10;
        margin-right: .5rem;
    }
`;