import { useState } from "react";
import "../CSS/Components/SearchBar.css";
import {FaSearch} from "react-icons/fa";

function SearchBar(){
    const [query, setQuery] = useState("");
    const [reply, setReply] = useState("");
    const [waitReply, setWaitReply] = useState(0);

    const sendMessage = async () => {
        setWaitReply(1);
        const res = await fetch("http://192.168.68.51:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
    
        const data = await res.json();
        setReply(data.reply);
        setWaitReply(0);
    };

    return(
        <>
            <div className="input-wrapper">
                <input placeholder = "Type query..." className="SearchBar" value={query} onChange={(e)=> setQuery(e.target.value)}></input>
                <FaSearch onClick={sendMessage}/>
            </div>
            <div className="query-wrapper">
                {waitReply===1 ? (<div>Thinking...</div>) : (<div>{reply}</div>)}
            </div>
        </>
    )
}
export default SearchBar;