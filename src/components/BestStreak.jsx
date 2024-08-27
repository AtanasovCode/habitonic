import { useState, useEffect } from "react";
import { parse, isSameDay, subDays, format } from "date-fns";
import styled from "styled-components";

const BestStreak = ({ currentHabit }) => {

    const [bestStreak, setBestStreak] = useState({});

    const calculateBestStreak = (dates) => {
        let streakCount = 0;
        let bestStreakCount = 0;
        let bestStreak = { start: null, end: null };
        let currentStreak = { start: null, end: null };

        const sortedDates = [...dates]
            .map(item => ({
                ...item,
                parsedDate: parse(item.date, "dd/MM/yyyy", new Date())
            }))
            .sort((a, b) => a.parsedDate - b.parsedDate);  // Sort in ascending order

        for (let i = 0; i < sortedDates.length; i++) {
            const { parsedDate, complete } = sortedDates[i];

            if (complete) {
                if (streakCount === 0) {
                    currentStreak.start = parsedDate;
                }

                streakCount++;
                currentStreak.end = parsedDate;

                // Check if the next day continues the streak
                if (i + 1 < sortedDates.length) {
                    const nextDate = sortedDates[i + 1].parsedDate;
                    if (!isSameDay(nextDate, subDays(parsedDate, -1))) {
                        // If the streak breaks
                        if (streakCount > bestStreakCount) {
                            bestStreakCount = streakCount;
                            bestStreak = { ...currentStreak };
                        }
                        streakCount = 0;
                    }
                } else {
                    // Last item in the list
                    if (streakCount > bestStreakCount) {
                        bestStreakCount = streakCount;
                        bestStreak = { ...currentStreak };
                    }
                }
            } else {
                // Reset streak if the date is incomplete
                if (streakCount > bestStreakCount) {
                    bestStreakCount = streakCount;
                    bestStreak = { ...currentStreak };
                }
                streakCount = 0;
            }
        }

        // Format the start and end dates to "MMMM, dd" format
        if (bestStreak.start && bestStreak.end) {
            bestStreak.start = format(bestStreak.start, "MMMM, dd");
            bestStreak.end = format(bestStreak.end, "MMMM, dd");
        }

        return bestStreak;
    };


    useEffect(() => {
        if (currentHabit && currentHabit.dates && currentHabit.dates.length > 0) {
            let bestStreak = calculateBestStreak(currentHabit.dates)

            setBestStreak(bestStreak);
            console.log(bestStreak);
        } else {
            return;
        }


    }, [currentHabit])

    return (
        <Container>
            <Title>Best Streak</Title>
            <Name>{bestStreak?.end}</Name>
            <Progress></Progress>
            <Name>{bestStreak?.start}</Name>
        </Container>
    );
}

export default BestStreak;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 2rem;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 1rem;
`;

const Name = styled.div`
    font-size: .9rem;
    color: ${props => props.theme.text};
`;

const Progress = styled.div`
    padding: .6rem;
    background-color: ${props => props.theme.primary};
    margin: 0 .3rem;
    border-radius: 32px;
    flex: 1;

    animation: slide .6s ease-in-out 1;

    @keyframes slide {
        0% {
            flex: 0;
        }

        100% {
            flex: 1;
        }
    }
`;