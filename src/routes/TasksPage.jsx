import logo from '../assets/logo.svg';
import '../styles/tasks-page.css';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

//importing components
import Filter from '../components/Filter';
import Task from '../components/Task';

//importing icons from icons library
import {
    CheckSquareOffset,
    Star,
    ClockCountdown,
    Checks,
    ArrowLeft,
    X,
    List,
    Plus,
    Info,
} from '@phosphor-icons/react';

const TasksPage = ({
    //importing the props passed down from the Router component
    tasks,
    setTasks,
}) => {

    //used to control opening/closing of nav for mobile view
    const [navOpen, setNavOpen] = useState(false);
    //used to see which filter is currently selected, default is 'all'
    const [filter, setFilter] = useState("all");
    //the name of the task
    const [name, setName] = useState("");

    //open/close mobile nav
    const handleNavOpen = () => {
        setNavOpen(!navOpen);
    }

    //sets the filter
    const handleFilterChange = (filter) => {
        setFilter(filter);
    }

    //when function is called it adds the task
    const handleAddTask = () => {
        if (name !== "") {
            const newTask = {
                name: name,
                complete: false,
                id: name,
                important: false,
                description: "",
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

    //functin is run when the user clicks to make the task important
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

    return (
        <div className="tasks-page-container">
            <div className={navOpen ? "tasks-nav active" : "tasks-nav"}>
                <div className="mobile-nav" onClick={() => handleNavOpen()}>
                    {
                        //display close or open icon
                        //based on if the nav is open or not
                        navOpen ?
                            <X
                                weight="light"
                                color="#fff"
                                size={32}
                            />
                            :
                            <List
                                weight="light"
                                color="#fff"
                                size={32}
                            />
                    }
                </div>
                <div className="logo-container">
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <div className="filter-container">
                    <Filter
                        filter={filter}
                        handleFilterChange={handleFilterChange}
                        FilterIcon={CheckSquareOffset}
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
                        FilterIcon={Checks}
                        filterName="complete"
                    />

                    <Link to="/" className="filter back-btn">
                        <div className="filter-icon">
                            <ArrowLeft
                                color="hsl(114, 70%, 54%)"
                                weight="light"
                                size={32}
                            />
                        </div>
                        <div className="filter-name">
                            Go Back
                        </div>
                    </Link>
                </div>
            </div>
            <div className={navOpen ? "tasks-container active" : "tasks-container"}>
                <div className="tasks">
                    {
                        tasks.map((task) => {
                            return (
                                <Task
                                    makeImportant={makeImportant}
                                    completeTask={completeTask}
                                    important={task.important}
                                    complete={task.complete}
                                    name={task.name}
                                    id={task.id}
                                    Star={Star}
                                    Info={Info}
                                />
                            )
                        })
                    }
                </div>
                <div className="add-task-container">
                    <div className="add-task">
                        <div className="input-icon" onClick={() => handleAddTask()}>
                            <Plus
                                weight="light"
                                color="#fff"
                                size={24}
                            />
                        </div>
                        <input
                            type="text"
                            className="input-task"
                            maxLength={80} //max number of characters is set to 80
                            placeholder="Add a task..."
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            onKeyDown={(e) => handleAddEnter(e.key)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TasksPage;