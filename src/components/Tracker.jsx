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
                    <IconContainer key={index} onClick={() => {
                        console.log(`Marking task ${id} as complete on date ${item.date}`);
                        markComplete(id, item.date);
                    }}>
                        <Check weight="bold" color="lime" size={22} />
                    </IconContainer>
                    :
                    <IconContainer key={index} onClick={() => {
                        console.log(`Marking task ${id} as complete on date ${item.date}`);
                        markComplete(id, item.date);
                    }}>
                        <X weight="light" color="#AAA" size={20} />
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
`;