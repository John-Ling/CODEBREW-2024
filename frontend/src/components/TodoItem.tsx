import { Task } from "../types"
import "../assets/css/todo_item.css";

const TodoItem: React.FC<{task: Task}> = ({task}) => {
    let priority: string = "Anytime";
    switch (Math.round(task.priority / 2)) {
        case 5:
            priority = "Urgent";
            break;
        case 4:
            priority = "Very Important";
            break;
        case 3:
            priority = "Important"
            break;
        case 2:
            priority = "Neutral"
            break;
        case 1:
            priority = "Low Importance"
            break;
    }
    
    return (
        <>
            <div className="todo-item">
                <h3>{task.task}</h3>
                <p>Priority: {priority}</p>
            </div>
        </>
    )
}

export default TodoItem;