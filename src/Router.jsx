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
import TasksPage from './routes/TasksPage';
import HabitStats from './routes/HabitStats';
import ErrorPage from './components/ErrorPage';

const Router = () => {

    const theme = {
        text: "#faf3f3",
        background: "#0f112e",
        homepageBG: "#1d2320",
        primary: "#0a76b8",
        secondary: "#3a345b",
        //accent: "#21aedd",
        accent: "#95d3e8",

        //darkBackground: "#0D0106",
        darkBackground: "#000000",
        taskBackground: "#050404",
        taskImportant: "#5f6fcf90",
        taskComplete: "#2f2f2f",

        dateComplete: "#95d3e8",
        dateNotComplete: "#4a4242",

        borderRadius: "20px",
    }

    const testTheme = {
        text: "#faf3f3",
        background: "#251A74",
        primary: "#9091e0",
        secondary: "#a34eff",
        accent: "#1e4467",

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
            element: <TasksPage
                tasks={tasks}
                setTasks={setTasks}
            />,
            errorElement: <ErrorPage />
        },
        {
            path: "/habit-stats",
            element: <HabitStats
                tasks={tasks}
                setTasks={setTasks}
            />,
            errorElement: <ErrorPage />
        },
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