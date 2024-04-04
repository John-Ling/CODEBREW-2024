import { useState, useRef, MouseEvent } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import "../assets/css/search_box.css";

// TODO
// maybe change data passing to state rather then query parameters

const SearchBox = () => {
    const [content, setContent] = useState<string>("");
    const ref = useRef<HTMLTextAreaElement>(null);
    const navigate: NavigateFunction = useNavigate();

    const handle_submit = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (content === "") {
            return;
        }
        navigate(`/loading?query=${content}`);
    }

    const handle_change = (e: any) => {
        setContent(e.target.value);
        if (ref.current) {
            ref.current.style.height = "auto";
            let currentHeight: number = e.target.scrollHeight;

            // only adjust height when text wraps otherwise height will be adjusted upon the first keypress
            if (currentHeight != 44) {
                ref.current.style.height = `${currentHeight - 16}px`;
            }
        }
    }

    return (
        <>
            <div id="search-box">
                <textarea 
                    ref={ref}
                    id="search-bar"
                    name="search-bar" 
                    rows={1}
                    autoComplete={"off"}
                    value={content}
                    onChange={handle_change}
                    placeholder="Just Type"
                />
                <div>
                    <Link id="submit-button" onClick={handle_submit} to={`/loading?query=${content}`}>Submit</Link>
                </div>
            </div>
        </>
    )
}




export default SearchBox;