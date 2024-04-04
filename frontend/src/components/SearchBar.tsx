import { ChangeEvent, useState, useRef } from "react";
import "../assets/css/search_box.css";

const SearchBar = () => {
    const [content, setContent] = useState<string>("");
    const ref = useRef<HTMLTextAreaElement>(null);

    const handle_submit = (e: ChangeEvent<HTMLAreaElement>) => {
        e.preventDefault();
    }

    const handle_change = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
                />
                <div>
                    <button id="submit-button">Submit</button>
                </div>
            </div>
        </>
    )
}




export default SearchBar;