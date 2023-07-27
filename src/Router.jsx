//importing from react-router
import { 
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

//Importing routes
import Homepage from './routes/Homepage';
import './styles/index.css';
const Router = () => {

    //creating the router with all the paths
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
            //errorElement: <Error />
        },
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