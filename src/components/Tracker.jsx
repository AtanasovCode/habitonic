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
                        <IconWrapper>
                            <Check 
                                weight="bold" 
                                color="lime" 
                                size="100%" 
                            />
                        </IconWrapper>
                    </IconContainer>
                    :
                    <IconContainer key={index} $index={index} onClick={() => {
                        markComplete(id, item.date);
                    }}>
                        <IconWrapper>
                            <X 
                                weight="light" 
                                color="#AAA" 
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
    }

    @media (max-width: 800px) {
        display: ${props => props.$index >= 5 ? "none" : "flex"};
    }

    @media (max-width: 675px) {
        border: 1px solid #fff;
    }
`;

const IconWrapper = styled.div`
    width: 22px;
    height: 22px;

    @media (max-width: 675px) {
        width: 16px;
        height: 16px;
    }
`;