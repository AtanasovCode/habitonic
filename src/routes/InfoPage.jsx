//importing stylesheet
import '../styles/info-page.css';

//importing from react-router
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//importing reusable component
import Feature from '../components/Feature';
import ContactForm from '../components/ContactForm';

//importing the logo
import logo from '../assets/logo.svg';

//importing icons 
import {
    Star,
    CalendarCheck,
    ArrowLeft,
    ArrowDown,
    HourglassHigh,
    Faders,
} from '@phosphor-icons/react';

const InfoPage = () => {

    return (
        <Container>
            <Hero>
                <Heading>
                    <Title>
                        <TitleWrapper>
                            <Fancy>Build</Fancy> Habits,
                        </TitleWrapper>
                        <TitleWrapper>
                            <Fancy>Improve</Fancy> Life!
                        </TitleWrapper>
                    </Title>
                </Heading>

                <Scroll>
                    <ScrollIcon>
                        <ArrowDown
                            size={24}
                            color="#FFFFFF"
                            weight="light"
                        />
                    </ScrollIcon>
                    Scroll
                </Scroll>
            </Hero>

            <FeaturesContainer>
                <FeatureTitle>
                    Features
                </FeatureTitle>
                {/*Reusable component used*/}
                <Feature
                    Icon={CalendarCheck}
                    title="Create and track new tasks"
                    description="Very easily create and track as many tasks as you need. 
                    Simply start typing the name of the task and add it to the list with 
                    the plus icon or simply by pressing the Enter key"
                />
                <Feature
                    Icon={HourglassHigh}
                    title="Set Due Dates and add descriptions"
                    description="Edit all kinds of aspects of your task, add due dates, descriptions
                    and make sure you never miss a task ever again!"
                />
                <Feature
                    Icon={Star}
                    title="Mark tasks as important, elevate them above the rest"
                    description="Click the star icon to mark any task as important
                    and it will rocket to the top of the list and get a special type of styling"
                />
                <Feature
                    Icon={Faders}
                    title="Filter through all your tasks"
                    description="Never miss out on a important task or an active one, by using the 5 different filters
                    you can quickly find the tasks that you are looking for. Saving valuable time and energy wherever needed"
                />
            </FeaturesContainer>

            <Prompt>
                <PromptText>
                    Start Tracking Now!
                </PromptText>
                <PromptButton to="/tasks">
                    Add Tasks
                </PromptButton>
            </Prompt>
        </Container>
    );
}

export default InfoPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Hero = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
`;

const Scroll = styled.div`
    position: absolute;
    bottom: 2%;
    right: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;

    @media (max-width: 675px) {
        display: none;
    }
`;

const ScrollIcon = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-right: .5rem;
`;

const Heading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-weight: 1000;
    font-size: 5rem;
    text-align: center;
    margin-bottom: 2rem;

    @media (max-width: 1024px) {
        font-size: 4rem;
    }

    @media (max-width: 675px) {
        font-size: 3rem;
    }

    @media (max-width: 400px) {
        font-size: 2rem;
    }
`;

const Fancy = styled.span`
    color: ${props => props.theme.accent};
`;

const TitleWrapper = styled.div``;


const FeaturesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FeatureTitle = styled.div`
    font-size: 2rem;
    font-weight: 1000;
    margin-bottom: 3rem;
`;

const Prompt = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.text};
    width: 100%;
    height: 30vh;
    margin: 2rem 0;

    @media (max-width: 675px) {
        flex-direction: column;
    }
`;

const PromptText = styled.div`
    font-size: 2rem;
    font-weight: 1000;
    margin-right: 1.2rem;

    @media (max-width: 675px) {
        margin-bottom: 1.5rem;
        margin-right: 0;
        font-size: 1.6rem;
    }
`;

const PromptButton = styled(Link)`
    border: none;
    background-color: ${props => props.theme.accent};
    border-radius: ${props => props.theme.borderRadius};
    padding: 1rem 2.2rem;
    font-size: 1.1rem;
    text-align: center;
    text-decoration: none;
    color: ${props => props.theme.background};
    font-weight: 700;
`;