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
        console.log(`date: ${date}`);
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
                    monthPositions.push({ month: format(parsedDate, "MMM"), position: index });
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

            const row = Math.floor(index / 7);
            const col = index % 7;

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
                    onClick={() => {
                        console.log(index)
                        handleMarkComplete(item.date)
                    }}
                >
                    <DayValue>
                        {format(parsedDate, "MMM d, yyyy")}
                    </DayValue>
                </Day>
            );
        });
    };

    return (
        <FullContainer>
            <MonthContainer>
                {monthStartPositions.map(({ month, position }) => (
                    <MonthLabel
                        key={position}
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
        </FullContainer>
    );
};

export default HeatMap;

const FullContainer = styled.div`
    width: 100%;

    @media (max-width: 1024px) {
        overflow-x: auto;
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    grid-gap: .2rem;
    width: 100%;

    @media (max-width: 768px) {
        align-items: center;
        align-content: center;
    }
`;

const MonthContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    grid-gap: .2rem;
    margin-bottom: .5rem;
`;

const MonthLabel = styled.div`
    font-size: 0.9rem;
    text-align: center;
`;

const Day = styled.div`
    background-color: ${props => props.$complete ? props.theme.dateComplete : props.theme.dateNotComplete};
    display: ${props => props.$index < 364 ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    aspect-ratio: 1;
    font-size: 0.8rem;
    color: #fff;
    position: relative;
    cursor: pointer;
    transition: background-color .25s ease-in-out;

    @media (max-width: 1024px) {
        min-width: .9rem;
    }
`;

const DayValue = styled.div`
    visibility: hidden;
    opacity: 0;
    display: none;
    position: absolute;
    top: -250%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    white-space: nowrap;
    z-index: -1;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    font-size: 1rem;
    padding: .5rem;
    border-radius: 8px;

    ${Day}:hover & {
        display: inline-block;
        visibility: visible;
        opacity: 1;
        z-index: 999;
    }

    @media (max-width: 1024px) {
            ${Day}:hover & {
                display: none;
                visibility: hidden;
                opacity: 0;
            }
    }
`;