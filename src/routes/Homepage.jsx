import '../styles/homepage.css';
import logo from '../assets/logo.svg';

//Used to link to the other routes of the site
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div className="home-container">
            <img src={logo} alt="logo" className="homepage-logo" />
            <div className="home-info-container">
                <div className="home-heading">
                    <span className="home-fancy">Habitonic</span>-
                    Create the perfect formula for your day
                </div>
                <div className="home-desc">
                    Stay organized, never forget anything and develop
                    healthy and productive habits to improve your life!
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