import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TodoItem from "./components/TodoItem";
import { Task } from "./types";
import "./assets/css/schedule_view.css";

const ScheduleView = () => {
    const location = useLocation();
    const [tasks, setTasks] = useState<Task[]>(location.state.tasks);
    console.log(tasks);
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
        return;
    }, []);

    const remove_task = ((id : string) => {
        setTasks(tasks.filter((task: Task) => task.id !== id));
        return;
    });

    return (
        <>
            <h1 className="schedule-header">Today's Schedule</h1>
            <div className="schedule-table">
                {tasks.map((task: Task) => <TodoItem task={task} remove_task={remove_task} />)}
            </div>
        
        </>
    )    
}

export default ScheduleView;