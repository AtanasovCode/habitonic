import { Link } from 'react-router-dom';
import styled from "styled-components";

import { 
    TrashSimple,
    Star,
    Info,
} from "@phosphor-icons/react";


const TaskIcons = ({
    complete,
    important,
    makeImportant,
    handleMoreInfo,
    id,
    trashTask,
    trash,
}) => {
    return (
        <Icons>
            {/*if the task is complete, you cannot make the task important*/}
            <TaskIcon onClick={() => !complete && makeImportant(id)}>
                <Star
                    weight={important ? "fill" : "light"}
                    color="#fff"
                    size={20}
                />
            </TaskIcon>

            <TaskIcon onClick={() => trashTask(id)}>
                <TrashSimple
                    weight={trash ? "fill" : "light"}
                    color="#fff"
                    size={20}
                />
            </TaskIcon>
        </Icons>
    );
}

export default TaskIcons;

const Icons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.background};
    border: 1px solid rgba(200, 200, 200, .5);
    padding: .5rem;
    position: absolute;
    top: -90%;
    left: 0;
    z-index: 3;
`;

const TaskIcon = styled.div`
    margin: .4rem;
    cursor: pointer;
`;

const IconLink = styled(Link)`
    margin: .4rem;
`;

const CloseIcon = styled.div`
    position: absolute;
    top: 1%;
    left: 1%;
`;