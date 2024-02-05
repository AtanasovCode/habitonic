import styled from "styled-components";

import { 
    PresentationChart,
} from "@phosphor-icons/react";


const Dashboard = ({
    tasks,
}) => {

    const getTotalHabits = () => {
        let total = 0;

        tasks.map((task) => {
            if (task) total++;
        })

        return total;
    }

    const getPercent = () => {
        let complete = 0;
        let total = getTotalHabits();

        tasks.map((task) => {
            task ?
                task.dates.map((item) => {
                    if (item.complete) complete++;
                }) : 0
        })

        const percent = (total / complete) * 100;

        return percent.toFixed(1);
    }

    const getMostActive = () => {
        let mostActiveHabit = null;
        let maxCompletedDates = 0;

        tasks.forEach(habit => {
            const completedDates = habit.dates.filter(date => date.complete).length;
            if (completedDates > maxCompletedDates) {
                maxCompletedDates = completedDates;
                mostActiveHabit = habit;
            }
        });

        const getImportant = () => {
            let important = 0;

            tasks.map((task) => {
                task.important && important++;
            })

            return important;
        }

        return mostActiveHabit;
    }


    //Return statement
    return (
        <Container>
            <Heading>
                <HeadingIcon>
                    <PresentationChart 
                        size="auto"
                        weight="fill"
                        color="#FFF"
                    />
                </HeadingIcon>
                <Title>
                    My Dashboard
                </Title>
            </Heading>

            <Statistics>
                <ProfileContainer>

                </ProfileContainer>
            </Statistics>
        </Container>
    );
}

export default Dashboard;

const Container = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`;

const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 4rem;
`;

const Title = styled.div`
    font-size: 3rem;
    font-weight: 1000;
    margin-left: 1rem;
`;

const HeadingIcon = styled.div`
    width: 64px;
    height: 64px;
`;

const Statistics = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const LevelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.accent};
`;