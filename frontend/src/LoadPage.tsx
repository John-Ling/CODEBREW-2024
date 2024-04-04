import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import imgUrl from './assets/media/logo.png'
import "./assets/css/fonts.css";
import "./assets/css/loadpage.css";

const LoadPage = () => {
    const [tasks, setTasks] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const call_api = async (llmQuery: string): Promise<any> => {
            let escaped: string = llmQuery.toString().replace(/'/g, "'\''");
            const response: Response = await fetch("http://127.0.0.1:5000/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "user_query": escaped })
            });
            const json = await response.json();
            console.log(json);
            setLoading(false);
            return json["tasks"];
        };

        if (tasks === "") {
            let query: string | null = searchParams.get("query");

            if (query !== null) {
                if (!blocked) {
                    call_api(query);
                }
            }
            setTasks("a");
        }

        return () => {
            blocked = true;
        };
    }, [tasks, searchParams]);

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
                </div>
            )}
        </>
    );
};

export default LoadPage;
