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

    @media (max-width: 1024px) {
        width: 95%;
    }

    @media (max-width: 675px) {
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
        width: 100%;

        &:nth-child(odd) {
            flex-direction: column-reverse;
        }
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

    @media (max-width: 1024px) {
        padding: 1rem;
    }

    @media (max-width: 675px) {
        width: 100%;
        height: 50vh;
    }
`;

const Title = styled.div`
    font-size: 3rem;
    font-weight: 1000;
    margin-bottom: 1rem;

    @media (max-width: 1024px) {
        font-size: 2rem;
    }

    @media (max-width: 675px) {
        font-size: 1.6rem;
    }
`;

const Description = styled.div`
    font-size: 1.4rem;

    @media (max-width: 1024px) {
        font-size: 1rem;
    }
`;

const IconContainer = styled.div`
    width: 50%;
    background-color: ${props => props.theme.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 78vh;

    @media (max-width: 675px) {
        width: 100%;
        height: 50vh;
    }
`;