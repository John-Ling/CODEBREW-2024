import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoadPage from "./LoadPage";
import TodoView from "./TodoView";

// TODO
// Make loading only accessible through app and not browser Done
// Link backend
// Create interface for todo list
// Secure routes so only accessible from app

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="loading" element={<LoadPage/>}/>
                    <Route path="todo" element={<TodoView/>}/>
                </Routes>
		    </BrowserRouter>
        </>
    )
}

export default App;