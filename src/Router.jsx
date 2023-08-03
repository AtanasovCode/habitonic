import { useState, useEffect } from 'react';

//importing from react-router
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './styles/index.css';

//Importing routes
import Homepage from './routes/Homepage';
import TasksPage from './routes/TasksPage';
import TaskDetails from './routes/TaskDetails';

const Router = () => {

    //array of objects that contains all of the user created tasks
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    //creating the router with all the paths
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />
        },
        {
            path: "/manage-tasks",
            element: <TasksPage
                tasks={tasks}
                setTasks={setTasks}
            />
        },
        {
            path: "/manage-tasks/task-info",
            element: <TaskDetails
                tasks={tasks}
                setTasks={setTasks}
            />
        }
    ])

    return (
        <div className="global-container">
            {/*Passing our created routes to the router provider*/}
            <RouterProvider router={router} />
        </div>
    );
}

//Exporting Router component
export default Router;