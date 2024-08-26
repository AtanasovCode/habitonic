import { useState, useEffect } from "react";
import { parse, isSameDay, subDays } from "date-fns";
import styled from "styled-components";

const BestStreak = ({ currentHabit }) => {

    const [bestStreak, setBestStreak] = useState({});

    const calculateBestStreak = (dates) => {
        let streakCount = 0;
        let bestStreak = { start: null, end: null };
        let currentStreak = { start: null, end: null };

        const sortedDates = [...dates]
            .map(item => ({
                ...item,
                parsedDate: parse(item.date, "dd/MM/yyyy", new Date())
            }))
            .sort((a, b) => b.parsedDate - a.parsedDate);

        for (let i = 0; i < sortedDates.length; i++) {
            const { parsedDate, complete } = sortedDates[i];

            if (complete && (streakCount === 0 || isSameDay(parsedDate, subDays(currentStreak.end || new Date(), streakCount)))) {
                streakCount++;

                // Start the streak if it's the first day
                if (streakCount === 1) {
                    currentStreak.start = parsedDate;
                }

                // Update the streak's end date to the current day
                currentStreak.end = parsedDate;

                // Check if this is the best streak so far
                if (streakCount > (bestStreak.end && bestStreak.start ? bestStreak.end - bestStreak.start : 0)) {
                    bestStreak = { ...currentStreak };
                }
            } else {
                // Reset streak
                streakCount = 0;
                currentStreak = { start: null, end: null };
            }
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
        <Container></Container>
    );
}

export default BestStreak;

const Container = styled.div``;