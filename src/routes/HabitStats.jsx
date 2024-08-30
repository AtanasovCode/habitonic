import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../useStore";

const HabitStats = ({
    tasks,
    setTasks,
}) => {

    const [currentHabit, setCurrentHabit] = useState({});

    useEffect(() => {
        let currentHabit = tasks.find((task) => task.id === sessionStorage.getItem("selectedHabitID"));

        console.log(currentHabit)
        setCurrentHabit(currentHabit);
    }, [])

    return (
        <Container>
            <Title>{currentHabit.name}</Title>
            <Dates>
                {
                    currentHabit.dates ?
                        currentHabit.dates.map((item) => {
                            return (
                                <Date key={item.date}>{item.date}</Date>
                            );
                        })
                        :
                        <Title>Loading</Title>
                }
            </Dates>
        </Container>
    );
}

export default HabitStats;

const Container = styled.div`

`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 3rem;
`;

const Dates = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Date = styled.div``;