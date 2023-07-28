import logo from '../assets/logo.svg';
import '../styles/tasks-page.css';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

//importing components
import Filter from '../components/Filter';

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
            tasks.push({ name: name, complete: false, id: name, important: false, description: "", })
            setName("");
        }
    }

    //when the enter key is pressed, function runs and adds the task
    const handleAddEnter = (key) => {
        if (key === "Enter") {
            handleAddTask();
        }
    }

    //functin is run when the user clicks to make the task important
    const makeImportant = (id) => {
        // Create a new array with updated tasks, marking the task with the given id as important
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, important: !task.important } : task
        );

        // Sort the updatedTasks array to move tasks with important=true to the top
        updatedTasks.sort((a, b) => (a.important === b.important ? 0 : a.important ? -1 : 1));

        // Update the state with the new array of tasks
        setTasks(updatedTasks);
    };

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
                                <div className={task.important ? "task important" : "task"}>
                                    <div className="task-info">
                                        <div className="task-radio">
                                            {/*Empty div is used for the custom radio button*/}
                                        </div>
                                        <div className="task-name">
                                            {task.name}
                                        </div>
                                    </div>
                                    <div className="task-icons">
                                        <div className="task-icon" onClick={() => { makeImportant(task.id) }}>
                                            <Star weight={task.important ? "fill" : "light"} color="gold" size={24} />
                                        </div>
                                        <div className="task-icon">
                                            <Info weight="light" color="#fff" size={24} />
                                        </div>
                                    </div>
                                </div>
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