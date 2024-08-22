import { useEffect, useState } from "react";
import { parse, isSameDay, subDays } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStore } from "../../useStore";

import {
    House,
    ListChecks,
    ClipboardText,
} from "@phosphor-icons/react";

const HabitStats = ({
    tasks,
    setTasks,
}) => {

    const [currentHabit, setCurrentHabit] = useState({});
    const [streak, setStreak] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalTracked, setTotalTracked] = useState(0);

    useEffect(() => {
        let currentHabit = tasks.find((task) => task.id === sessionStorage.getItem("selectedHabitID"));

        console.log(currentHabit)
        setCurrentHabit(currentHabit);
    }, [])

    useEffect(() => {
        const getHabitStats = () => {
            if (!currentHabit || !currentHabit.dates || currentHabit.dates.length === 0) {
                return { streak: 0, totalComplete: 0, totalTracked: 0 };
            }

            let streakCount = 0;
            let totalCompleteCount = 0;
            let totalTrackedCount = currentHabit.dates.length;
            const today = new Date();

            // Sort dates in reverse order (latest first)
            const sortedDates = [...currentHabit.dates]
                .map(item => ({
                    ...item,
                    parsedDate: parse(item.date, "dd/MM/yyyy", new Date())
                }))
                .sort((a, b) => b.parsedDate - a.parsedDate);

            // Loop through sorted dates to calculate stats
            for (let i = 0; i < sortedDates.length; i++) {
                const { parsedDate, complete } = sortedDates[i];

                if (complete) {
                    totalCompleteCount++;

                    // Check for streak by comparing consecutive dates
                    if (streakCount === 0 || isSameDay(parsedDate, subDays(today, streakCount))) {
                        streakCount++;
                    } else {
                        break; // Stop streak if dates are not consecutive
                    }
                }
            }

            setStreak(streakCount);
            setTotalComplete(totalCompleteCount);
            setTotalTracked(totalTrackedCount);
        };

        getHabitStats();
    }, [currentHabit])

    useEffect(() => {
        console.log(`streak: ${streak}, total: ${totalComplete}, tracked: ${totalTracked}`)
    }, [totalComplete, totalTracked, streak])


    return (
        <Container>
            <FloatingNav>
                <FloatingItem>
                    <FloatingIcon>
                        <ListChecks
                            weight="fill"
                            color="#8b8787"
                            size={24}
                        />
                    </FloatingIcon>
                    <FloatingName>Habits</FloatingName>
                </FloatingItem>
                <FloatingItem>
                    <FloatingIcon>
                        <House
                            weight="fill"
                            color="#8b8787"
                            size={24}
                        />
                    </FloatingIcon>
                    <FloatingName>Home</FloatingName>
                </FloatingItem>
            </FloatingNav>
            <Title>
                <TitleIcon>
                    <ClipboardText
                        size={36}
                        color="#FFF"
                        weight="fill"
                    />
                </TitleIcon>
                {currentHabit.name}
            </Title>
        </Container>
    );
}

export default HabitStats;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem 4rem;
`;

const FloatingNav = styled.div`
    position: fixed;
    bottom: 2%;
    left: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const FloatingItem = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: .5rem;
`;

const FloatingIcon = styled.div`
    margin-right: .6rem;
`;

const FloatingName = styled.div`
    font-size: .9rem;
    color: #8b8787;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 3rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

const TitleIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.25rem;
`;

const Dates = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;