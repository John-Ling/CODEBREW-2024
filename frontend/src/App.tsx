import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoadPage from "./LoadPage";

// TODO
// Make loading only accessible through app and not browser Done
// Link backend
// Create interface for todo list


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="loading" element={<LoadPage/>}/>
                </Routes>
		    </BrowserRouter>
        </>
    )
}

export default App;