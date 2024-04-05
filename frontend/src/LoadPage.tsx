import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useSearchParams, useNavigate, NavigateFunction } from "react-router-dom";
import { Task } from "./types";
import "./assets/css/load_page.css";
import logo from "./assets/media/logo.png";

const LoadPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const navigate: NavigateFunction = useNavigate();

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

            // generate tasks and then move to schedule view
            let tasks: Task[] = [];
            if (!blocked) {
                (JSON.parse(data).tasks).forEach((task: Task) => {
                    tasks.push({id: nanoid(), task: task.task, priority: task.priority, startTime: task.startTime, endTime: task.endTime});
                });

                navigate("/schedule", {state: {tasks: tasks}});
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
                    <img src={logo}/>
                    <h2>Loading...</h2>
                </div>
            ) :  (<></>)}
        </>
    );
};

export default LoadPage;
