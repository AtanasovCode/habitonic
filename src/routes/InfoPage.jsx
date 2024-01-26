//importing stylesheet
import '../styles/info-page.css';

//importing the logo
import logo from '../assets/logo.svg';

//importing from react-router
import { Link } from 'react-router-dom';

//importing reusable component
import Feature from '../components/Feature';
import ContactForm from '../components/ContactForm';

//importing icons 
import {
    ClockCountdown,
    ShootingStar,
    CalendarCheck,
    ArrowLeft,
    InstagramLogo,
    TwitterLogo,
    GithubLogo,
} from '@phosphor-icons/react';

const InfoPage = () => {

    return (
        <div className="info-page-container">
            <div className="info-page-hero">
                <nav className="info-page-nav">
                    <div className="info-logo-container">
                        <img src={logo} alt="website logo" className='info-page-logo' />
                    </div>
                    <div className="info-nav-links">
                        <Link
                            to="/tasks"
                            className="info-link track"
                        >
                            Start Tracking
                        </Link>
                        <Link
                            to="/"
                            className="info-link back"
                        >
                            <ArrowLeft
                                weight="light"
                                size={20}
                                color="#ddd"
                                className="info-link-icon"
                            />
                            Go Home
                        </Link>
                    </div>
                </nav>
                <div className="info-page-heading">
                    <div className="info-page-title">
                        Taskie - task tracking master
                    </div>
                    <div className="info-page-subtitle">
                        Stay organized, never miss a beat!
                        Taskie keeps your tasks and deadlines
                        in one place, easy to access and manage.
                        Set reminders, prioritize efficiently,
                        and enjoy a user-friendly interface.
                        Sign up now and take control of
                        your tasks with Taskie
                    </div>
                </div>
            </div>

            <div className="info-features-container">
                <div className="info-features-title title">
                    Features
                </div>
                {/*Reusable component used*/}
                <Feature
                    Icon={ClockCountdown}
                    title="Create and track new tasks"
                    description="Tracking new tasks has never been easier,
                    just start typing and then simply press enter and watch your task
                    get added to the list"
                />
                <Feature
                    Icon={CalendarCheck}
                    title="Set Due Dates and add descriptions"
                    description="Edit all kinds of aspects of your task, add due dates, descriptions
                    and make sure you never miss a task ever again!"
                />
                <Feature
                    Icon={ShootingStar}
                    title="Mark tasks as important, elevate them above the rest"
                    description="Click the star icon to mark any task as important
                    and it will rocket to the top of the list and get a special type of styling"
                />
            </div>

            <div className="info-prompt-container">
                <div className="info-prompt-title title">
                    Start Tracking Now!
                </div>
                <Link to="/tasks" className="info-prompt-btn">
                    Add Tasks
                </Link>
            </div>

            <div className="footer">
                <div className="footer-logo-container">
                    <img src={logo} alt="footer logo" className="footer-logo" />
                </div>
                <div className="footer-form-container">
                    <ContactForm />
                </div>
                <div className="footer-social-icons">
                    <InstagramLogo
                        weight="fill"
                        className="footer-icon"
                    />
                    <TwitterLogo
                        weight="fill"
                        className="footer-icon"
                    />
                    <GithubLogo
                        weight="fill"
                        className="footer-icon"
                    />
                </div>
            </div>
        </div>
    );
}

export default InfoPage;