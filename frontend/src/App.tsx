import SearchBar from "./components/SearchBar";
import "./assets/css/index.css";
import "./assets/css/fonts.css";

function App() {
    return (
        <>
            <main id="main-view">
                <h1>What's Happening Today?</h1>
                <SearchBar></SearchBar>
            </main>
        </>
    );
}

export default App;