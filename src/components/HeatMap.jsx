import { useEffect, useState } from "react";
import styled from "styled-components";
import { format, subDays } from "date-fns";

const HeatMap = ({ size }) => {
    const [dates, setDates] = useState([]);

    // Generates the last N days
    const generateDates = (n) => {
        const dates = [];
        for (let i = 0; i < n; i++) {
            const date = subDays(new Date(), i);
            dates.push(format(date, 'dd/MM/yy'));
        }
        return dates.reverse();
    };

    const returnMap = () => {
        return dates.map((date, index) => (
            <Day key={index} title={date}>
                {date}
            </Day>
        ));
    };

    useEffect(() => {
        const generatedDates = generateDates(size);
        setDates(generatedDates);
    }, [size]);

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
    grid-template-columns: repeat(20, 1fr); // Adjust columns as needed
    grid-gap: .2rem;
    width: 50%;
    max-width: 1440px;
    margin-top: 1.5rem;
`;

const Day = styled.div`
    background-color: ${props => props.theme.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    aspect-ratio: 1;
    font-size: 0.8rem;
    color: #fff;
`;
