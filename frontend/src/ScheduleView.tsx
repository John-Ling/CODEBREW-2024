import { useLocation } from "react-router-dom";
import TodoItem from "./components/TodoItem";
import { Task } from "./types";
import "./assets/css/schedule_view.css";

const ScheduleView = () => {
    const location = useLocation();
    const compare_function = (a: Task, b: Task) => {
        if (a.priority < b.priority) {
            return 1;
        }
        if (a.priority > b.priority) {
            return -1;
        }
        return 0;
    }
    
    let tasks: Task[] = location.state.tasks;
    tasks.sort(compare_function);

    console.log(location.state.tasks);
    return (
        <>
            <h1 className="schedule-header">Today's Schedule</h1>
            <div className="schedule-table">
                {tasks.map((task: Task) => <TodoItem task={task} />)}
            </div>
        
        </>
    )    
}

export default ScheduleView;