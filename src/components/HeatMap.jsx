import { format, parse } from "date-fns";
import styled from "styled-components";

// Define the format of the input date string
const INPUT_DATE_FORMAT = "dd/MM/yyyy";

const HeatMap = ({ size, currentHabit }) => {

    const returnMap = () => {
        return currentHabit && currentHabit.dates && currentHabit.dates.map((item) => {
            // Parse the date string according to the input format
            const parsedDate = parse(item.date, INPUT_DATE_FORMAT, new Date());

            // Check for invalid date
            if (isNaN(parsedDate.getTime())) {
                console.error("Invalid date:", item.date);
                return null; // Skip rendering for invalid dates
            }

            return (
                <Day key={item.date} value={item.date} $complete={item.complete}>
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
    grid-template-columns: repeat(20, 1fr); // Adjust columns as needed
    grid-gap: .2rem;
    width: 50%;
    max-width: 1440px;
    margin-top: 1.5rem;
`;

const Day = styled.div`
    background-color: ${props => props.$complete ? props.theme.accent : props.theme.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    aspect-ratio: 1;
    font-size: 0.8rem;
    color: #fff;
    position: relative;
`;

const DayValue = styled.div`
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: -150%;
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
