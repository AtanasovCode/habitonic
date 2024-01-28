//importing from react
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

//importing from react-router
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

//importing stylesheet
import './styles/index.css';

//Importing routes
import Homepage from './routes/Homepage';
import TasksPage from './routes/TasksPage';
import TaskDetails from './routes/TaskDetails';
import InfoPage from './routes/InfoPage';

const Router = () => {

    const theme = {
        text: "#f2f2f2",
        background: "#1f1e1e",
        primary: "#e62ae6",
        secondary: "#75642a",
        accent: "#c8a73c",

        borderRadius: "16px",
    }

    const testTheme = {
        text: "#dddcf5",
        background: "#0a091f",
        primary: "#9091e0",
        secondary: "#638b27",
        accent: "#0600c2",

        borderRadius: "16px",
    }

    //array of objects that contains all of the user created tasks
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    // Save tasks to localStorage whenever tasks change
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
            path: "/tasks",
            element: <TasksPage
                tasks={tasks}
                setTasks={setTasks}
            />
        },
        {
            path: "/tasks/info",
            element: <TaskDetails
                tasks={tasks}
                setTasks={setTasks}
            />
        },
        {
            path: "/how-it-works",
            element: <InfoPage />
        }
    ])

    return (
        <ThemeProvider theme={theme}>
            <div className="global-container">
                {/*Passing our created routes to the router provider*/}
                <RouterProvider router={router} />
            </div>
        </ThemeProvider>
    );
}

//Exporting Router component
export default Router;