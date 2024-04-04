import { Task } from "./types";

const TodoView: React.FC<Task[]> = (tasks: Task[]) => {
    return (
        <>
            <h1>Your Day</h1>
        </>
    )    
}

export default TodoView;