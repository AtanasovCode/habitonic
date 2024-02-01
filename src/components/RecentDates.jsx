import { useEffect, useState } from "react";
import styled from "styled-components";

const RecentDates = () => {
    const [lastTenDates, setLastTenDates] = useState([]);

    useEffect(() => {
        // Function to get the last 10 formatted dates
        const getLastTenFormattedDates = () => {
            const today = new Date();
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dates = [];

            for (let i = 0; i < 10; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const formattedDate = `${weekdays[date.getDay()]} ${date.getDate()}`;
                dates.push({ day: formattedDate.slice(0, 3), date: formattedDate.slice(4) });
            }

            return dates;
        };

        // Update lastTenDates state
        setLastTenDates(getLastTenFormattedDates());
    }, []); // Run the effect only once on component mount

    return (
        <Container>
            <DateContainer>
                {lastTenDates.map((item, index) => (
                    <DateWrapper key={index}>
                        <Day>{item.day}</Day>
                        <Number>{item.date}</Number>
                    </DateWrapper>
                ))}
            </DateContainer>
        </Container>
    );
};

export default RecentDates;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 .7rem;
    font-size: .9rem;

    &:last-child {
        margin-right: 0;
    }

    &:first-child {
        margin-left: 0;
    }
`;

const Day = styled.div`
    color: ${props => props.theme.accent};
`;

const Number = styled.div``;
