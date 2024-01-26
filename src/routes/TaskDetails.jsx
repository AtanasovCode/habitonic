import '../styles/task-details.css';
import { useEffect, useState } from 'react';

//Link used to link back to tasks page
import { Link } from 'react-router-dom';

//importing icons
import {
    Star,
    FloppyDisk,
    ArrowLeft,
} from '@phosphor-icons/react';

const TaskDetails = ({
    tasks,
    setTasks,
}) => {

    //values used to update the tasks details
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        //when the page loads, set the above state to the task details
        tasks.map((task) => {
            if (task.id === sessionStorage.getItem("currentID")) {
                setName(task.name);
                setDescription(task.description);
                setDueDate(task.dueDate);
            }
        })
    }, [tasks])

    //function runs when the user clicks the update task button
    const updateTask = () => {
        //creates a new array and updates the values
        const updatedTasks = tasks.map((task) => {
            if (task.id === sessionStorage.getItem("currentID")) {
                return {
                    ...task,
                    name: name ? name : task.name,
                    description: description ? description : "",
                    dueDate: dueDate ? dueDate : "",
                };
            } else {
                return task; // Return the original task if the condition is not met
            }
        });

        //update the original tasks with the new updated tasks
        setTasks(updatedTasks);
    };

        return(
            <div className="task-details-container">
                <div className="details-heading">
                    Edit your task
                </div>
                {
                    tasks.map((task) => {
                        //if the task id matches the selected task id,
                        //display all the info about that task
                        if (task.id === sessionStorage.getItem("currentID")) {
                            return (
                                <div className="current-task-container" key={task.id}>
                                    <div className="task-change">
                                        <div className="task-change-title">
                                            Name
                                        </div>
                                        <textarea
                                            type="text"
                                            value={name}
                                            maxLength={80}
                                            placeholder="Enter task name"
                                            className="task-name-input"
                                            onChange={(e) => setName(e.currentTarget.value)}
                                        ></textarea>
                                        <div className="task-change-subtitle">
                                            The display name of the task
                                        </div>
                                    </div>
                                    <div className="task-change">
                                        <div className="task-change-title">
                                            Description
                                        </div>
                                        <textarea
                                            name="desc"
                                            className="task-desc-input"
                                            placeholder="Add task description"
                                            value={description}
                                            maxLength={150}
                                            onChange={(e) => setDescription(e.currentTarget.value)}
                                        ></textarea>
                                        <div className="task-change-subtitle">
                                            Write a short description of the task
                                        </div>
                                    </div>
                                    <div className="task-change">
                                        <div className="task-change-title">
                                            <Star
                                                size={36}
                                                weight={task.important ? "fill" : "light"}
                                                color="#fff"
                                                className="details-star"
                                            />
                                            {task.important ? "Marked as important" : "Not marked as important"}
                                        </div>
                                    </div>
                                    <div className="task-change">
                                        <div className="task-change-title">
                                            Date Created
                                        </div>
                                        <div className="task-date-created">
                                            {task.dateCreated}
                                        </div>
                                    </div>
                                    <div className="task-change">
                                        <div className="task-change-title">
                                            Due Date
                                        </div>
                                        <div className="task-set-date">
                                            <input
                                                type="date"
                                                className="date-picker"
                                                value={dueDate}
                                                onChange={(e) => setDueDate(e.currentTarget.value)}
                                            />
                                        </div>
                                        <div className="task-change-subtitle">
                                            Set a due-date for your task
                                        </div>
                                    </div>
                                    <div className="save-btn-container">
                                        <Link
                                            className="save-btn"
                                            onClick={() => updateTask()}
                                            to="../tasks"
                                        >
                                            <FloppyDisk
                                                weight="light"
                                                size={24}
                                                color="#000"
                                                className="btn-icon"
                                            />
                                            Save changes
                                        </Link>
                                        <Link
                                            className="save-btn details-back-btn"
                                            to="../tasks"
                                        >
                                            <ArrowLeft
                                                weight="light"
                                                size={24}
                                                color="#ccc"
                                                className="btn-icon"
                                            />
                                            Go back
                                        </Link>
                                    </div>
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
}

export default TaskDetails;