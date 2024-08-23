import styled from "styled-components";

const HeatMap = ({
    size,
    dates,
}) => {

    const returnMap = () => {
        const days = [];
        for (let i = 1; i <= size; i++) {
            days.push(<Day key={i}>{i}</Day>);
        }
        return days;
    }

    return (
        <Container>
            {returnMap()}
        </Container>
    );
}

export default HeatMap;


const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: .2rem;
    width: 70%;
    margin-top: 1.5rem;
`;

const Day = styled.div`
    background-color: #3a3737;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    aspect-ratio: 1;
`;