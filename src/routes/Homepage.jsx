import '../styles/homepage.css';

//Used to link to the other routes of the site
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div className="home-container">
            <div className="home-info-container">
                <div className="home-heading">
                    Track, Organize, <span className="home-fancy">Conquer</span> your day
                </div>
                <div className="home-desc">
                    Welcome to Taskie - Your Ultimate Task Planner!
                    Stay organized, never miss a beat! Taskie keeps
                    your tasks and deadlines in one place, easy to
                    access and manage. Set reminders, prioritize 
                    efficiently, and enjoy a user-friendly interface. 
                    Sign up now and take control of your tasks with Taskie
                </div>
                <Link to="/how-it-works" className="learn-more-link">
                    Learn More
                </Link>
                {/*Linking to the tasks page*/}
                <Link to="/tasks" className="home-btn">
                    Start Tracking
                </Link>
            </div>
            <div className="home-image-container">
                {/*Container used for the background image*/}
            </div>
        </div>
    );
}

export default Homepage;