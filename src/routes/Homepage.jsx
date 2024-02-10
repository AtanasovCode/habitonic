//Used to link to the other routes of the site
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.svg';

import InfoPage from './InfoPage';


const Homepage = () => {
    return (
        <Container>
            <Nav>
                <HomepageLogo src={logo} alt="logo" />
            </Nav>

            <Hero>
                <HomeInfoContainer>
                    <HomeHeading>
                        <HomeFancy>Habitonic</HomeFancy>-
                        Create the perfect formula for your day
                    </HomeHeading>
                    <HomeDesc>
                        Stay organized, never forget anything and develop
                        healthy and productive habits to improve your life!
                    </HomeDesc>
                    {/*Linking to the tasks page*/}
                    <HomeBtn to="/tasks">
                        Start Tracking
                    </HomeBtn>
                </HomeInfoContainer>
            </Hero>

            <InfoPage />
        </Container>
    );
}

export default Homepage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: ${props => props.theme.homepageBG};
`;

const Nav = styled.div`
    width: 100%;
    padding: 1.5rem 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #ffffff50;

    @media (max-width: 675px) {
        justify-content: center;
    }
`;

const HomepageLogo = styled.img`
    height: 2.6rem;
`;

const Hero = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
`;

const HomeInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    z-index: 5;
    text-align: center;

    @media (max-width: 1250px) {
        width: 60%;
    }
    
    @media (max-width: 1024px) {
        width: 70%;
    }

    @media (max-width: 675px) {
        width: 95%;
    }
`;

const HomeHeading = styled.h1`
    font-size: 3.9rem;
    font-weight: 1000;
    margin-bottom: 2rem;

    @media (max-width: 1300px) {
        font-size: 3.4rem;
    }

    @media (max-width: 1024px) {
        font-size: 3rem;
    }

    @media (max-width: 675px) {
        font-size: 2.5rem;
    }

    @media (max-width: 440px) {
        font-size: 2rem;
    }
`;

const HomeFancy = styled.span`
    margin-right: 16px;
    background: linear-gradient(
        to right,
        ${props => props.theme.primary},
        ${props => props.theme.accent}
    );
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
`;

const HomeDesc = styled.p`
    z-index: 5;
    font-size: 1.2rem;
`;

const HomeBtn = styled(Link)`
    margin-top: 2.5rem;
    padding: 1.5rem;
    z-index: 5;
    background-color: ${props => props.theme.primary};
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
        background-color: ${props => props.theme.accent};
        z-index: 1;
        transition: all .2s ease;
        font-family: var(--font);
    }

    &:hover::before {
        top: 0;
        left: 0;
    }
`;