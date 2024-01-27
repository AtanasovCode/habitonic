import styled from "styled-components";


const Feature = ({
    Icon,
    title,
    description,
}) => {
    return (
        <Container>
            <IconContainer>
                <Icon 
                    size={156}
                    weight="fill"
                    color="#fff"
                />
            </IconContainer>
            <Info>
                <Title>
                    {title}
                </Title>
                <Description>
                    {description}
                </Description>
            </Info>
        </Container>
    );
}

export default Feature;

const Container = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    width: 80%;

    &:nth-child(odd) {
        flex-direction: row-reverse;
    }
`;

const Info = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2.5rem;
`;

const Title = styled.div`
    font-size: 3rem;
    font-weight: 1000;
    margin-bottom: 1rem;
`;

const Description = styled.div`
    font-size: 1.4rem;
`;

const IconContainer = styled.div`
    width: 50%;
    background-color: ${props => props.theme.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 78vh;
`;