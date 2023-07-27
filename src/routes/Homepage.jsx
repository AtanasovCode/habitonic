import '../styles/homepage.css';

//Used to link to the ohter pages of the site
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div className="home-container">
            <div className="home-info-container">
                <div className="home-heading">
                    Track, Organize, <span className="home-fancy">Conquer</span> your day
                </div>
                <div className="home-desc">
                    Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Reprehenderit expedita
                    eaque sequi quod, quasi ea accusamus
                    ipsam cumque, corrupti cupiditate
                </div>
                <Link to="/manage-tasks" className="home-btn">
                    Start Tracking
                </Link>
            </div>
            <div className="home-image-container"></div>
        </div>
    );
}

export default Homepage;