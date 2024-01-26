//Used to link to the other routes of the site
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.svg';


const Homepage = () => {
    return (
        <HomeContainer>
            <HomepageLogo src={logo} alt="logo" />
            <HomeInfoContainer>
                <HomeHeading>
                    <HomeFancy>Habitonic</HomeFancy>-
                    Create the perfect formula for your day
                </HomeHeading>
                <HomeDesc>
                    Stay organized, never forget anything and develop
                    healthy and productive habits to improve your life!
                </HomeDesc>
                <LearnMoreLink to="/how-it-works">
                    Learn More
                </LearnMoreLink>
                {/*Linking to the tasks page*/}
                <HomeBtn to="/tasks">
                    Start Tracking
                </HomeBtn>
            </HomeInfoContainer>
            <div className="home-image-container">
                {/* Container used for the background image */}
            </div>
        </HomeContainer>
    );
}

export default Homepage;

const HomeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--background);
`;

const HomeInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 45%;
    z-index: 5;
    text-align: center;
`;

const HomeHeading = styled.h1`
    font-size: 3.9rem;
    font-weight: 1000;
    margin-bottom: 2rem;
`;

const HomeFancy = styled.span`
    color: var(--accent);
    margin-right: 16px;
`;

const HomeDesc = styled.p`
    z-index: 5;
    font-size: 1.2rem;
`;

const HomeBtn = styled(Link)`
    margin-top: 2.5rem;
    padding: 1.5rem;
    z-index: 5;
    background-color: var(--secondary);
    color: var(--text);
    border-radius: var(--border-radius);
    border: none;
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
    cursor: pointer;

    &::before {
        content: 'Start Tracking';
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 8%;
        left: 4%;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
        background-color: var(--accent);
        z-index: 1;
        transition: all .2s ease;
        font-family: var(--font);
    }

    &:hover::before {
        top: 0;
        left: 0;
    }
`;

const LearnMoreLink = styled(Link)`
    font-size: 1rem;
    color: var(--text);
    background-color: var(--secondary);
    text-decoration: none;
    cursor: pointer;
    padding: 1rem;
    border-radius: var(--border-radius);
    position: absolute;
    top: 5%;
    right: 5%;
`;

// Making the homepage responsive
const responsiveStyles = `
    @media (max-width: 850px) {
        ${HomeContainer} {
            justify-content: center;
        }
        ${HomeInfoContainer} {
            align-items: center;
            text-align: center;
        }
        .home-image-container {
            background-position: center;
            background-size: cover;
        }
        .home-image-container::before  {
            background-color: rgba(0, 0, 0, .7);
        }
    }

    // Mobile Mode
    @media (max-width: 500px) {
        ${HomeContainer} {
            padding: 1rem;
        }
        ${HomeInfoContainer} {
            padding: .5rem;
            max-width: 100%;
        }
        ${HomeHeading} {
            font-size: 32px;
        }
    }
`;

const HomepageLogo = styled.img`
    position: absolute;
    top: 5%;
    left: 5%;
    height: 2.4rem;
`;