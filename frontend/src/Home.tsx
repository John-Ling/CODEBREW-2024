import SearchBox from "./components/SearchBox";
import "./assets/css/home.css";
import "./assets/css/fonts.css";

const Home = () => {
    return (
        <main id="main-view">
            <h1>What's Happening Today?</h1>
            <SearchBox/>
        </main>
    )
}

export default Home;