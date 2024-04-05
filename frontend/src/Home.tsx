import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import "./assets/css/home.css";

const Home = () => {
    const navigate = useNavigate();
    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
    }

    let tasks: string | null = localStorage.getItem("tasks");
    if (tasks === null) {
        return <></>
    }

    useEffect(() => {
        if (tasks === null) {
            return;
        }
        if (JSON.parse(tasks).length != 0) {
            navigate("/schedule");
        }
        return;
    })

    console.log(tasks);
    return (
        <main id="main-view">
            <h1>What's Happening Today?</h1>
            <SearchBox/>
        </main>
    )
}

export default Home;