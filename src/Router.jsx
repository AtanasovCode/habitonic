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

    //creating the router with all the paths
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
            //errorElement: <Error />
        },
        {
            path: "/manage-tasks",
            element: <TasksPage />
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