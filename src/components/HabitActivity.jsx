import styled from "styled-components";

import { Crown } from "@phosphor-icons/react";



const HabitActivity = () => {
    return (
        <Container>
            <Wrapper>
                <ScoreContainer>
                    <CrownContainer>
                        <Crown 
                            size={64}
                            weight="fill"
                            color="#fff"
                        />
                    </CrownContainer>
                    <Score>
                        36
                    </Score>
                </ScoreContainer>
            </Wrapper>
        </Container>
    );
}

export default HabitActivity;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Wrapper = styled.div`
    width: 80%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: ${props => props.theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const ScoreContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 90%;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
`;

const CrownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(30%);
`;

const Score = styled.div`
    font-size: 5rem;
    font-weight: 900;
    color: ${props => props.theme.text};
`;
