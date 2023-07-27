import logo from '../assets/logo.svg';
import '../styles/tasks-page.css';
import { useState } from 'react';

import { Link } from 'react-router-dom';

//importing icons from icons library
import {
    CheckSquareOffset,
    Star,
    ClockCountdown,
    Checks,
    ArrowLeft,
    X,
    List,
} from '@phosphor-icons/react';

const TasksPage = () => {

    const [navOpen, setNavOpen] = useState(false);

    const handleNavOpen = () => {
        setNavOpen(!navOpen);
    }

    return (
        <div className="tasks-page-container">
            <div className={navOpen ? "tasks-nav active" : "tasks-nav"}>
                <div className="mobile-nav" onClick={() => handleNavOpen()}>
                    {
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
                    <div className="filter">
                        <div className="filter-icon">
                            <CheckSquareOffset
                                color="hsl(114, 70%, 54%)"
                                weight="light"
                                size={32}
                            />
                        </div>
                        <div className="filter-name">
                            All
                        </div>
                    </div>

                    <div className="filter">
                        <div className="filter-icon">
                            <Star
                                color="hsl(114, 70%, 54%)"
                                weight="light"
                                size={32}
                            />
                        </div>
                        <div className="filter-name">
                            Important
                        </div>
                    </div>

                    <div className="filter">
                        <div className="filter-icon">
                            <ClockCountdown
                                color="hsl(114, 70%, 54%)"
                                weight="light"
                                size={32}
                            />
                        </div>
                        <div className="filter-name">
                            Active
                        </div>
                    </div>

                    <div className="filter">
                        <div className="filter-icon">
                            <Checks
                                color="hsl(114, 70%, 54%)"
                                weight="light"
                                size={32}
                            />
                        </div>
                        <div className="filter-name">
                            Complete
                        </div>
                    </div>

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
            <div className="tasks-container"></div>
        </div>
    );
}

export default TasksPage;