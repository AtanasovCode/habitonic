import styled from "styled-components";

const HabitInfo = ({
    name,
    value,
    icon,
    flex,
}) => {
    return (
        <Container $flex={flex}>
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
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    border-radius: 16px;
    margin: .2rem;
    flex: 1;

    @media (max-width: 1024px) {
        margin: .1rem;
        padding: .5rem;
    }

    @media (max-width: 768px) {
        flex: ${props => props.$flex}%;
    }
`;


const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: capitalize;

    @media (max-width: 1024px) {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        margin-bottom: .5rem;
    }

    @media (max-width: 550px) {
        font-size: .9rem;
        margin-bottom: .4rem;
    }
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

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 550px) {
        font-size: .9rem;
    }
`;