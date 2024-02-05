import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { X, Check } from "@phosphor-icons/react";

const Tracker = ({
    dates,
    markComplete,
    id,
}) => {
    return (
        <Container>
            {dates.slice(0, 10).map((item, index) => (
                item.complete ?
                    <IconContainer key={index} $index={index} onClick={() => {
                        markComplete(id, item.date);
                    }}>
                        <IconWrapper type="check">
                            <Check 
                                weight="bold" 
                                color="#21aedd"
                                size="100%" 
                            />
                        </IconWrapper>
                    </IconContainer>
                    :
                    <IconContainer key={index} $index={index} onClick={() => {
                        markComplete(id, item.date);
                    }}>
                        <IconWrapper type="x">
                            <X 
                                weight="light" 
                                color="#AAAAAA" 
                                size="100%" 
                            />
                        </IconWrapper>
                    </IconContainer>
            ))}
        </Container>
    );
};


export default Tracker;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.3rem;
    cursor: pointer;

    @media (max-width: 1200px) {
        width: 2.5rem;
        display: ${(props) => (props.$index >= 8 ? "none" : "flex")};   
    }

    @media (max-width: 800px) {
        display: ${props => props.$index >= 6 ? "none" : "flex"};
    }

    @media (max-width: 550px) {
        width: 2rem;
        display: ${props => props.$index >= 4 ? "none" : "flex"};
    }
`;

const IconWrapper = styled.div`
    width: ${props => props.type === "check" ? "26px" : "22px"};
    height: ${props => props.type === "check" ? "26px" : "22px"};

    

    @media (max-width: 675px) {
        width: 20px;
        height: 20px;
    }
`;