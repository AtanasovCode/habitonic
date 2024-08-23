import styled from "styled-components";

const HabitInfo = ({
    name,
    value,
    icon,
}) => {
    return (
        <Container>
            <Title>
                <Icon>
                    {icon}
                </Icon>
                {name}
            </Title>
            <Stat>
                {value}
            </Stat>
        </Container>
    );
}

export default HabitInfo;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: .5rem 1rem;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    border-radius: 16px;
`;


const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: capitalize;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .5rem;
`;

const Stat = styled.div`
    text-align: center;
    font-size: 1.2rem;
`;