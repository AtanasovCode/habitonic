import { useState } from 'react';

//importing from react-router
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './styles/index.css';

//Importing routes
import Homepage from './routes/Homepage';
import TasksPage from './routes/TasksPage';

const Router = () => {

    //array of objects that contains all of the user created tasks
    const [tasks, setTasks] = useState([]);

    //creating the router with all the paths
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
            //errorElement: <Error />
        },
        {
            path: "/manage-tasks",
            element: <TasksPage
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