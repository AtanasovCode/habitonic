import '../styles/task.css';
import '../styles/tasks-page.css';

import { Link } from 'react-router-dom';

//reusable component for tasks
const Task = ({
    makeImportant,
    completeTask,
    handleMoreInfo,
    important,
    complete,
    name,
    id,
    trash,
    Star,
    Info,
    TrashSimple,
    trashTask,
}) => {

    //gets the class of the task
    const getClassName = () => {
        if (important) return "task important";
        if (complete) return "task complete"
        return "task";
    }

    return (
        <div className={getClassName()} key={id}>
            <div className="task-info">
                <div className={complete ? "task-radio complete" : "task-radio"} onClick={() => completeTask(id)}>
                    {/*Empty div is used for the custom radio button*/}
                </div>
                <div className="task-name">
                    {name}
                </div>
            </div>
            <div className="task-icons">
                {/*if the task is complete, you cannot make the task important*/}
                <div className="task-icon-container" onClick={() => !complete && makeImportant(id)}>
                    <Star
                        weight={important ? "fill" : "light"}
                        color="#fff"
                        size={24}
                        className="task-icon"
                    />
                </div>
                <Link
                    to="/tasks/info"
                    className="task-icon"
                    onClick={() => handleMoreInfo(id)}
                >
                    <Info
                        weight="light"
                        color="#fff"
                        size={24}
                        className="task-icon"
                    />
                </Link>
                <div className="task-icon-container" onClick={() => trashTask(id)}>
                    <TrashSimple
                        weight={trash ? "fill" : "light"}
                        color="#fff"
                        size={24}
                        className="task-icon"
                    />
                </div>
            </div>
        </div>
    );
}

export default Task;