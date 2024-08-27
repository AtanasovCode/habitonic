import { useEffect, useState } from "react";
import { parse, isSameDay, subDays, getMonth, getDaysInMonth, isSameMonth } from "date-fns";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStore } from "../../useStore";

import HeatMap from "../components/HeatMap";
import HabitInfo from "../components/HabitInfo";
import HabitPanel from "../components/HabitPanel";
import BestStreak from "../components/BestStreak";
import PhotoSelect from "../components/PhotoSelect";

import {
    House,
    ListChecks,
    CalendarDots,
    Fire,
    Trophy,
    CalendarPlus,
} from "@phosphor-icons/react";

const INPUT_DATE_FORMAT = "dd/MM/yyyy";

const HabitStats = ({
    tasks,
    setTasks,
}) => {

    const [currentHabit, setCurrentHabit] = useState({});
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState();
    const [totalComplete, setTotalComplete] = useState(0);
    const [totalTracked, setTotalTracked] = useState(0);
    const [monthlyScore, setMonthlyScore] = useState(0);
    const [heatMapSize, setHeatMapSize] = useState(30);
    const [showPhotoSelect, setShowPhotoSelect] = useState(false);

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
        const currentDate = new Date();
        const daysInMonth = getDaysInMonth(currentDate);

        // Filter dates for only those completed in the current month
        const datesThisMonth = dates.filter(item => {
            const parsedDate = parse(item.date, INPUT_DATE_FORMAT, new Date());
            return item.complete && isSameMonth(parsedDate, currentDate);
        });

        const daysCompleteThisMonth = datesThisMonth.length;

        if (daysInMonth === 0) return 0;

        return Math.floor((daysCompleteThisMonth / daysInMonth) * 100);
    };

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

    const togglePhotoSelect = () => {
        setShowPhotoSelect(!showPhotoSelect);
    }

    useEffect(() => {
        console.log(`currentHabit.icon: ${currentHabit.icon}`)
        const updatedTasks = tasks.map((task) => {
            if (task.id === currentHabit.id) {
                return { ...task, icon: currentHabit.icon };
            }
            return task;
        });

        setTasks(updatedTasks);
    }, [currentHabit]);



    return (
        <Container>
            {
                showPhotoSelect &&
                <>
                    <Tint onClick={() => togglePhotoSelect()} />
                    <PhotoSelect
                        togglePhotoSelect={togglePhotoSelect}
                        currentHabit={currentHabit}
                        setCurrentHabit={setCurrentHabit}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </>
            }
            <HabitPanel
                title={currentHabit.name}
                togglePhotoSelect={togglePhotoSelect}
                currentHabit={currentHabit}
            />
            <InfoContainer>
                <InfoWrapper>
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
                    <BestStreak currentHabit={currentHabit} />
                    <SubTitle>
                        Habit Activity
                    </SubTitle>
                    <Explanation>
                        (click on a date to mark/unmark it as complete)
                    </Explanation>
                    <HeatMap
                        currentHabit={currentHabit}
                        setCurrentHabit={setCurrentHabit}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </InfoWrapper>
            </InfoContainer>
        </Container>
    );
}

export default HabitStats;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    background-color: ${props => props.theme.darkBackground};
`;

const Tint = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    backdrop-filter: blur(5px);

    animation: fade .4s ease-in-out;

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`;

const InfoContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2.5rem 0;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 100%;
`;

const SubTitle = styled.div`
    width: 100%;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 768px) {
    }
`;

const Explanation = styled.div`
    width: 100%;
    font-size: 1rem;
    color: darkgray;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
`;

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 4rem;

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