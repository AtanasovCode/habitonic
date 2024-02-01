import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { X, Check } from "@phosphor-icons/react";

const Tracker = () => {
    const [habitStatus, setHabitStatus] = useState(Array(10).fill(false));

    const toggleHabitStatus = (index) => {
        const updatedStatus = [...habitStatus];
        updatedStatus[index] = !updatedStatus[index];
        setHabitStatus(updatedStatus);
    };

    const getLastTenFormattedDates = () => {
        const today = new Date();
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dates = [];

        for (let i = 0; i < 10; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const formattedDate = `${weekdays[date.getDay()]} ${date.getDate()}`;
            dates.push({
                day: formattedDate.slice(0, 3),
                date: formattedDate.slice(4),
            });
        }

        return dates;
    };

    useEffect(() => {
        // Update lastTenDates state
        getLastTenFormattedDates();
    }, []); // Run the effect only once on component mount

    return (
        <Container>
            {habitStatus.map((completed, index) => (
                completed ?
                    <IconContainer key={index} onClick={() => toggleHabitStatus(index)}>
                        <Check weight="bold" color="lime" size={22} />
                    </IconContainer>
                    :
                    <IconContainer key={index} onClick={() => toggleHabitStatus(index)}>
                        <X weight="light" color="#AAA" size={20} />
                    </IconContainer>
            ))}
        </Container>
    );
};

export default Tracker;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.3rem;
    cursor: pointer;
`;
