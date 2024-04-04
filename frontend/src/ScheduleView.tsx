import { useLocation } from "react-router-dom";
import { Task } from "./types";

const ScheduleView = () => {
    const location = useLocation();
    return (
        <>
            <h1>Today's Schedule</h1>
            {location.state.tasks.map((task: Task) => <p>{task.task} {task.priority}</p>)}
        </>
    )    
}

export default ScheduleView;