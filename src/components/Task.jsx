import '../styles/tasks-page.css';

//reusable component for tasks
const Task = ({
    makeImportant,
    completeTask,
    important,
    complete,
    name,
    id,
    Star,
    Info,
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
                <div className="task-icon" onClick={() => !complete && makeImportant(id)}>
                    <Star weight={important ? "fill" : "light"} color="gold" size={24} />
                </div>
                <div className="task-icon">
                    <Info weight="light" color="#fff" size={24} />
                </div>
            </div>
        </div>
    );
}

export default Task;