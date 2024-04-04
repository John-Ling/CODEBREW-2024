import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Task } from "./types";
import imgUrl from './assets/media/logo.png'
import "./assets/css/fonts.css";
import "./assets/css/load_page.css";

const LoadPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let blocked: boolean = false;
        const call_api = async (llmQuery: string): Promise<any> => {
            let escaped: string = llmQuery.toString().replace(/'/g, "'\''");
            const response: Response = await fetch("http://127.0.0.1:5000/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "user_query": escaped })
            });
            let data = await response.json();
            if (!blocked) {
                (JSON.parse(data).tasks).forEach((task: Task) => {
                    setTasks(oldState => [...oldState, {task: task.task, priority: task.priority}]);
                });
            }
            setLoading(false);
        };

        let query: string | null = searchParams.get("query");
        if (query !== null) {
            call_api(query);
        }

        return () => {
            blocked = true;
        }
    }, []);

    return (
        <>
            {loading ? (
                <div className="loading-container">
                    <div className="spinner">
                        <img src={imgUrl} alt="Logo" />
                    </div>
                    <h2>Loading...</h2>
                </div>
            ) : (
                <div>
                    {tasks.map((task: Task) => <p>{task.task} {task.priority}</p>)}
                </div>
            )}
        </>
    );
};

export default LoadPage;
