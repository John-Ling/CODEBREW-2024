import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

// TODO
// Make loading only accessible through app and not browser

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
		    </BrowserRouter>
        </>
    )
}

export default App;