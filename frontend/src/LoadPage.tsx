import { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import "./assets/css/fonts.css";

const LoadPage = () => {
    const [tasks, setTasks] = useState<string>("");
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let blocked: boolean = false;
        const call_api = async (llmQuery: string): Promise<[string, number][]> => {
            let escaped: string = llmQuery.toString().replace(/'/g, "'\''");
            const response = await fetch("http://127.0.0.1:8080/query", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"query": escaped})
            })
            const json = await response.json();
            console.log(json);
            return json["tasks"];
        }

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
        }
    }, [tasks])
    return(
        <>
            <h2>Loading...</h2>
        </>
    )
}

export default LoadPage;