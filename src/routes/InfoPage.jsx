//importing from react-router
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//importing reusable component
import Feature from '../components/Feature';

//importing icons 
import {
    Star,
    CalendarCheck,
    ArrowDown,
    HourglassHigh,
    Faders,
    ProjectorScreenChart,
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
                    Icon={HourglassHigh}
                    title="Habit Creation and Tracking"
                    description="Start and track your new habits with ease. 
                    Set personalized goals, track your progress daily, and never forget to stay on course"
                />
                <Feature
                    Icon={Star}
                    title="Habit Sorting and Organization"
                    description="Easily organize your habits by importance, 
                    activity status, and more. Stay focused on what matters most 
                    and keep your habits neatly sorted for a seamless experience"
                />
                <Feature
                    Icon={ProjectorScreenChart}
                    title="Personalized Habit Analytics"
                    description="Get personalized analytics based on your habits 
                    and goals. See how you're progressing and receive tailored 
                    suggestions to enhance your habit-building journey."
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
    background: linear-gradient(
    to right,
    ${props => props.theme.primary},
        ${props => props.theme.accent}
    );
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
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