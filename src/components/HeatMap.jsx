import { format, parse, getMonth } from "date-fns";
import styled from "styled-components";
import { useEffect, useState } from "react";

// Define the format of the input date string
const INPUT_DATE_FORMAT = "dd/MM/yyyy";

const HeatMap = ({
    currentHabit,
    setCurrentHabit,
    tasks,
    setTasks,
}) => {
    const [monthStartPositions, setMonthStartPositions] = useState([]);

    const handleMarkComplete = (date) => {
        const updatedDates = currentHabit?.dates.map((item) => {
            if (item.date === date) {
                return { ...item, complete: !item.complete };
            }
            return item;
        });

        // Update current habit
        setCurrentHabit((prevHabit) => ({
            ...prevHabit,
            dates: updatedDates
        }));
    };

    useEffect(() => {
        const updatedTasks = tasks.map(task => {
            if (task.id === currentHabit.id) {
                return { ...task, dates: currentHabit.dates };
            }
            return task;
        });

        setTasks(updatedTasks);

        if (currentHabit && currentHabit.dates) {
            const monthPositions = [];
            let lastMonth = null;

            currentHabit.dates.forEach((item, index) => {
                const parsedDate = parse(item.date, INPUT_DATE_FORMAT, new Date());
                const currentMonth = getMonth(parsedDate);

                if (currentMonth !== lastMonth) {
                    monthPositions.push({ month: format(parsedDate, "MMMM"), position: index });
                    lastMonth = currentMonth;
                }
            });

            setMonthStartPositions(monthPositions);
        }
    }, [currentHabit.dates]);

    const returnMap = () => {
        return currentHabit && currentHabit.dates && currentHabit.dates.map((item, index) => {
            const parsedDate = parse(item.date, INPUT_DATE_FORMAT, new Date());

            if (isNaN(parsedDate.getTime())) {
                console.error("Invalid date:", item.date);
                return null;
            }

            const row = Math.floor(index / 5);
            const col = index % 5;

            return (
                <Day
                    key={item.date}
                    value={item.date}
                    $index={index}
                    $complete={item.complete}
                    style={{
                        gridRow: col + 1,
                        gridColumn: row + 1
                    }}
                    onClick={() => handleMarkComplete(item.date)}
                >
                    <DayValue>
                        {format(parsedDate, "MMMM d, yyyy")}
                    </DayValue>
                </Day>
            );
        });
    };

    return (
        <>
            <MonthContainer>
                {monthStartPositions.map(({ month, position }) => (
                    <MonthLabel
                        key={month}
                        style={{
                            gridColumn: Math.floor(position / 5) + 1, // Align to the correct column
                            gridRow: 1
                        }}
                    >
                        {month}
                    </MonthLabel>
                ))}
            </MonthContainer>
            <Container>
                {returnMap()}
            </Container>
        </>
    );
};

export default HeatMap;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    grid-gap: .2rem;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
        align-items: center;
        align-content: center;
    }
`;

const MonthContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(52, 1fr); // 52 columns for each date
    grid-gap: .2rem;
    margin-bottom: .5rem;
`;

const MonthLabel = styled.div`
    font-size: 0.9rem;
    text-align: center;
`;

const Day = styled.div`
    background-color: ${props => props.$complete ? props.theme.dateComplete : props.theme.dateNotComplete};
    display: ${props => props.$index < 260 ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    aspect-ratio: 1;
    font-size: 0.8rem;
    color: #fff;
    position: relative;
    cursor: pointer;
    min-width: 1rem;

    transition: background-color .25s ease-in-out;

    @media (max-width: 768px) {
        padding: .5rem;
        display: ${props => props.$index < 90 ? "flex" : "none"};
    }

    @media (max-width: 550px) {
        display: ${props => props.$index < 60 ? "flex" : "none"};
    }
`;

const DayValue = styled.div`
    visibility: hidden;
    opacity: 0;
    display: none;
    position: absolute;
    top: -200%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    padding: .5rem 1rem;
    border-radius: 16px;
    white-space: nowrap;
    z-index: 999;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    font-size: 1rem;

    ${Day}:hover & {
        visibility: visible;
        opacity: 1;
        display: inline-block;
    }
`;
