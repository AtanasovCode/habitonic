import styled from "styled-components";
import { useRouteError } from "react-router-dom";

import { SealWarning } from "@phosphor-icons/react";

const ErrorPage = () => {

    const error = useRouteError();

    return (
        <Container>
            <IconContainer>
                <SealWarning
                    weight="duotone"
                    size={256}
                    color="#FFF"
                />
            </IconContainer>
            <Heading>
                <Title>
                    {error.status}
                </Title>
                <Description>
                    {error.message}
                </Description>
            </Heading>
        </Container>
    );
}

export default ErrorPage;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
`;

const Heading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
`;

const Title = styled.div`
    font-size: 4rem;
    font-weight: 1000;
    margin-bottom: 2rem;
`;

const Description = styled.div`
    font-size: 1rem;
`;