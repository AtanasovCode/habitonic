import { useEffect, useState } from "react";
import { parse, isSameDay, subDays, getMonth } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStore } from "../../useStore";

import HeatMap from "../components/HeatMap";
import HabitInfo from "../components/HabitInfo";

import {
    House,
    ListChecks,
    ClipboardText,
    SealCheck,
    CalendarBlank,
    CalendarDots,
    SealPercent,
} from "@phosphor-icons/react";

const HabitStats = ({
    tasks,
    setTasks,
}) => {

    const [currentHabit, setCurrentHabit] = useState({});
    const [streak, setStreak] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalTracked, setTotalTracked] = useState(0);
    const [heatMapSize, setHeatMapSize] = useState(30);

    useEffect(() => {
        let currentHabit = tasks.find((task) => task.id === sessionStorage.getItem("selectedHabitID"));

        console.log(currentHabit)
        setCurrentHabit(currentHabit);
    }, [])

    const calculateStreak = (dates) => {
        let streakCount = 0;
        const today = new Date();

        const sortedDates = [...dates]
            .map(item => ({
                ...item,
                parsedDate: parse(item.date, "dd/MM/yyyy", new Date())
            }))
            .sort((a, b) => b.parsedDate - a.parsedDate);

        for (let i = 0; i < sortedDates.length; i++) {
            const { parsedDate, complete } = sortedDates[i];

            if (complete && (streakCount === 0 || isSameDay(parsedDate, subDays(today, streakCount)))) {
                streakCount++;
            } else {
                break; // Stop streak if dates are not consecutive
            }
        }

        return streakCount;
    };

    const calculateTotalComplete = (dates) => {
        return dates.reduce((total, item) => item.complete ? total + 1 : total, 0);
    };

    const calculateTotalTracked = (dates) => {
        return dates.length;
    };

    useEffect(() => {
        if (currentHabit && currentHabit.dates && currentHabit.dates.length > 0) {
            const streak = calculateStreak(currentHabit.dates);
            const totalComplete = calculateTotalComplete(currentHabit.dates);
            const totalTracked = calculateTotalTracked(currentHabit.dates);

            setStreak(streak);
            setTotalComplete(totalComplete);
            setTotalTracked(totalTracked);
        } else {
            setStreak(0);
            setTotalComplete(0);
            setTotalTracked(0);
        }
    }, [currentHabit]);

    const getMonthName = (date) => {
        const monthIndex = getMonth(date);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[monthIndex];
    };



    useEffect(() => {
        console.log(`streak: ${streak}, total: ${totalComplete}, tracked: ${totalTracked}`)
        console.log(`month: ${getMonth(new Date())}`)
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
            <StatsContainer>
                <StatsWrapper>
                    <HabitInfo
                        name="streak"
                        value={streak}
                        icon={<SealCheck weight="fill" color="#fff" size={32} />}
                    />
                    <HabitInfo
                        name="total complete"
                        value={totalComplete}
                        icon={<ListChecks weight="fill" color="#fff" size={32} />}
                    />
                </StatsWrapper>
                <StatsWrapper>
                    <HabitInfo
                        name="days tracked"
                        value={totalTracked}
                        icon={<CalendarDots weight="fill" color="#fff" size={32} />}
                    />
                    <HabitInfo
                        name={`${getMonthName(new Date())} score`}
                        value={totalTracked}
                        icon={<SealPercent weight="fill" color="#fff" size={32} />}
                    />
                </StatsWrapper>
            </StatsContainer>
            <HeatMap size={30} dates={currentHabit.dates} />
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

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const StatsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;