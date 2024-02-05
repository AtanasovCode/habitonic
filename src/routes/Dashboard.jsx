import styled from "styled-components";


const Dashboard = ({
    tasks,
}) => {

    const getTotalHabits = () => {
        let total = 0;

        tasks.map((task) => {
            if (task) total++;
        })

        return total;
    }

    const getPercent = () => {
        let complete = 0;
        let total = getTotalHabits();

        tasks.map((task) => {
            task ?
                task.dates.map((item) => {
                    if (item.complete) complete++;
                }) : 0
        })

        const percent = (total / complete) * 100;

        return percent.toFixed(1);
    }

    const getMostActive = () => {
        let mostActiveHabit = null;
        let maxCompletedDates = 0;

        tasks.forEach(habit => {
            const completedDates = habit.dates.filter(date => date.complete).length;
            if (completedDates > maxCompletedDates) {
                maxCompletedDates = completedDates;
                mostActiveHabit = habit;
            }
        });

        return mostActiveHabit;
    }


    //Return statement
    return (
        <Container></Container>
    );
}

export default Dashboard;

const Container = styled.div``;