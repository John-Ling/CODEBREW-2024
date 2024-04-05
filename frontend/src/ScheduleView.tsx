import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TodoItem from "./components/TodoItem";
import { Task } from "./types";
import "./assets/css/schedule_view.css";

const ScheduleView = () => {
    const location = useLocation();

    // load tasks if they are already present
    let retrieved: string | null = localStorage.getItem("tasks");
    if (retrieved === null ){
        return <></>
    }

    let initialTasks: Task[] = [];
    if (JSON.parse(retrieved).length != 0) {
        initialTasks = JSON.parse(retrieved);
    } else {
        if (location.state !== null) {
            initialTasks = location.state.tasks; // otherwise retrieve data sent from loading screen
        }
    }

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    
    const compare_function = (a: Task, b: Task) => {
        if (a.priority < b.priority) {
            return 1;
        }
        if (a.priority > b.priority) {
            return -1;
        }
        return 0;
    };

    useEffect(() => {
        let ordered: Task[] = [...tasks].sort(compare_function);
        setTasks(ordered);
        localStorage.setItem("tasks", JSON.stringify(ordered));
        return;
    }, []);

    const remove_task = ((id : string) => {
        let filtered: Task[] = tasks.filter((task: Task) => task.id !== id);
        setTasks(filtered);
        localStorage.setItem("tasks", JSON.stringify(filtered));
        return;
    });

    return (
        <>
            <h1 className="schedule-header">Today's Schedule</h1>
            <div className="schedule-table">
                {tasks.length != 0 ? tasks.map((task: Task) => <TodoItem key={task.id} task={task} remove_task={remove_task} />) : <p className="empty-message">Done for the Day!</p>}
            </div>
        </>
    )    
}

export default ScheduleView;