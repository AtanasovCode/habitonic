import { useState, useEffect } from "react";
import { parse, isSameDay, subDays, format } from "date-fns";
import styled from "styled-components";

const BestStreak = ({ currentHabit }) => {

    const [bestStreak, setBestStreak] = useState({});

    const calculateBestStreak = (dates) => {
        let streakCount = 0;
        let bestStreakCount = 0;
        let bestStreak = { start: null, end: null, count: 0 };
        let currentStreak = { start: null, end: null, count: 0 };

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
                currentStreak.count = streakCount;

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

    const getCount = (count) => {
        if (count === 0) {
            return 0;
        } else if (count === 1) {
            return 0.01;
        } else if (count === 2 || count === 3) {
            return 0.1;
        } else if (count >= 4 && count <= 7) {
            return 0.2;
        } else if (count >= 7 && count <= 10) {
            return 0.3;
        } else if (count >= 11 && count <= 15) {
            return 0.4;
        } else if (count >= 16 && count <= 20) {
            return 0.5;
        } else if (count >= 21 && count <= 25) {
            return 0.6;
        } else if (count >= 26 && count <= 30) {
            return 0.7;
        } else if (count >= 31 && count <= 35) {
            return 0.8;
        } else if (count >= 36 && count <= 40) {
            return 0.9;
        } else if (count >= 40) {
            return 1;
        } else {
            return 1; // Default value if no conditions are met
        }
    };



    return (
        <Container>
            <Title>Best Streak</Title>
            {
                bestStreak.count > 0 ?
                    <StreakWrapper>
                        <Name>{bestStreak?.start}</Name>
                        <Progress $flexValue={getCount(bestStreak.count)}></Progress>
                        <Name>{bestStreak?.end}</Name>
                    </StreakWrapper>
                    :
                    <Explanation>No streaks found</Explanation>
            }
        </Container>
    );
}

export default BestStreak;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
`;

const Title = styled.div`
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;

    @media (max-width: 550px) {
        margin-rigth: .4rem;
        font-size: 1rem;
    }
`;

const StreakWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Name = styled.div`
    font-size: .9rem;
    color: ${props => props.theme.text};

    @media (max-width: 550px) {
        font-size: .8rem;
    }
`;

const Progress = styled.div`
    padding: .6rem;
    background-color: ${props => props.theme.accent};
    margin: 0 .3rem;
    border-radius: 32px;
    flex: ${props => props.$flexValue};
    transition: all .4s ease-in-out;

    animation: slide .6s ease-in-out 1;

    @keyframes slide {
        0% {
            flex: 0;
        }

        100% {
            flex: ${props => props.$flexValue};
        }
    }

    @media (max-width: 550px) {
        padding: .4rem;
    }
`;

const Explanation = styled.div`
    text-align: center;
    color: darkgray;
    font-size: .9rem;
`;