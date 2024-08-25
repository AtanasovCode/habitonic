import { useEffect, useState } from "react";
import { parse, isSameDay, subDays, getMonth, getDaysInMonth } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStore } from "../../useStore";

import HeatMap from "../components/HeatMap";
import HabitInfo from "../components/HabitInfo";
import HabitActivity from "../components/HabitActivity";

import {
    House,
    ListChecks,
    ClipboardText,
    SealCheck,
    CalendarBlank,
    CalendarDots,
    Fire,
    SealPercent,
    Trophy,
    Target,
    CalendarPlus,
} from "@phosphor-icons/react";

const HabitStats = ({
    tasks,
    setTasks,
}) => {

    const [currentHabit, setCurrentHabit] = useState({});
    const [streak, setStreak] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalTracked, setTotalTracked] = useState(0);
    const [monthlyScore, setMonthlyScore] = useState(0);
    const [heatMapSize, setHeatMapSize] = useState(30);

    useEffect(() => {
        let currentHabit = tasks.find((task) => task.id === sessionStorage.getItem("selectedHabitID"));

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

    const calculateMonthlyScore = (dates) => {
        let daysInMonth = getDaysInMonth(new Date());
        let daysComplete = calculateTotalComplete(dates);

        if (daysInMonth === 0) return 0;

        return Math.floor((daysComplete / daysInMonth) * 100);
    }

    useEffect(() => {
        if (currentHabit && currentHabit.dates && currentHabit.dates.length > 0) {
            const streak = calculateStreak(currentHabit.dates);
            const totalComplete = calculateTotalComplete(currentHabit.dates);
            const score = calculateMonthlyScore(currentHabit.dates);

            setStreak(streak);
            setTotalComplete(totalComplete);
            setMonthlyScore(score);
        } else {
            setStreak(0);
            setTotalComplete(0);
            setMonthlyScore(0);
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
            <ActivityContainer>
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
                <HabitActivity />
            </ActivityContainer>
            <InfoContainer>
                <SubTitle>Overview</SubTitle>
                <StatsContainer>
                    <StatsWrapper>
                        <HabitInfo
                            name="date created"
                            value={currentHabit.dateCreated}
                            icon={<CalendarPlus weight="fill" color="#fff" size={32} />}
                            flex={100}
                        />
                        <HabitInfo
                            name="streak"
                            value={streak}
                            icon={<Fire weight="fill" color="#fff" size={32} />}
                            flex={85}
                        />
                    </StatsWrapper>
                    <StatsWrapper>
                        <HabitInfo
                            name="total complete"
                            value={totalComplete}
                            icon={<CalendarDots weight="fill" color="#fff" size={32} />}
                            flex={85}
                        />
                        <HabitInfo
                            name={`${getMonthName(new Date())} score`}
                            value={`${monthlyScore}%`}
                            icon={<Trophy weight="fill" color="#fff" size={32} />}
                            flex={100}
                        />
                    </StatsWrapper>
                </StatsContainer>
                <SubTitle>Habit Activity</SubTitle>
                <HeatMap size={30} currentHabit={currentHabit} />
            </InfoContainer>
        </Container>
    );
}

export default HabitStats;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem 4rem;
    overflow-x: hidden;

    @media (max-width: 1024px) {
        padding: 2rem;
    }

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
    }

    @media (max-width: 550px) {
        padding: 1rem .5rem;
    }
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

const ActivityContainer = styled.div`
    flex: 36%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 4rem;
`;

const InfoContainer = styled.div`
    flex: 100%;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;


    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SubTitle = styled.div`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const TitleIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.25rem;
`;

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StatsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;