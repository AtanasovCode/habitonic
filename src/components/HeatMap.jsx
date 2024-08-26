import { format, parse } from "date-fns";
import styled from "styled-components";
import { formatDate } from "./Utils";
import { useEffect } from "react";

// Define the format of the input date string
const INPUT_DATE_FORMAT = "dd/MM/yyyy";

const HeatMap = ({
    currentHabit,
    setCurrentHabit,
    tasks,
    setTasks,
}) => {

    const handleMarkComplete = (date) => {
        const updatedDates = currentHabit?.dates.map((item) => {
            if (item.date === date) {
                return { ...item, complete: !item.complete };
            }
            return item; // Always return the item if the date doesn't match
        });

        // Update current habit
        setCurrentHabit((prevHabit) => ({
            ...prevHabit,
            dates: updatedDates
        }));
    };


    useEffect(() => {
        // Find the habit in the tasks array by its unique identifier (e.g., id)
        const updatedTasks = tasks.map(task => {
            if (task.id === currentHabit.id) {
                return { ...task, dates: currentHabit.dates }; // Update the dates of the matching habit
            }
            return task; // Keep other tasks unchanged
        });

        // Update the tasks state with the new tasks array
        setTasks(updatedTasks);
    }, [currentHabit]);



    const returnMap = () => {
        return currentHabit && currentHabit.dates && currentHabit.dates.map((item, index) => {
            // Parse the date string according to the input format
            const parsedDate = parse(item.date, INPUT_DATE_FORMAT, new Date());

            // Check for invalid date
            if (isNaN(parsedDate.getTime())) {
                console.error("Invalid date:", item.date);
                return null; // Skip rendering for invalid dates
            }

            return (
                <Day
                    key={item.date}
                    value={item.date}
                    $complete={item.complete}
                    $index={index}
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
        <Container>
            {returnMap()}
        </Container>
    );
};

export default HeatMap;

// Styled components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(40, 1fr);
    grid-gap: .2rem;
    width: 100%;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(30, 1fr);
    }

    @media (max-width: 768px) {
        width: 100%;
        align-items: center;
        align-content: center;
        grid-template-columns: repeat(20, 1fr);
    }

    @media (max-width: 550px) {
        grid-template-columns: repeat(15, 1fr);

    }
`;

const Day = styled.div`
    background-color: ${props => props.$complete ? "#564ee0" : "#332f2f"};
    display: ${props => props.$index < 120 ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    //border-radius: 50%;
    aspect-ratio: 1;
    padding: .5rem;
    font-size: 0.8rem;
    color: #fff;
    position: relative;
    cursor: pointer;

    transition: background-color .25s ease-in-out;

    @media (max-width: 768px) {
        padding: .5rem;
    }
`;

const DayValue = styled.div`
    visibility: hidden;
    opacity: 0;
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
    }
`;
