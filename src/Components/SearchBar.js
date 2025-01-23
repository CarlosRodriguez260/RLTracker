import { useState } from "react";
import "../CSS/Components/SearchBar.css";
import {FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar(){
    const [input, setInput] = useState("");
    const handleChange = (value) => {
        setInput(value)
        console.log(typeof(input))
    }
    const navigate = useNavigate();
    const goToTracker = () => {
        navigate("Tracker/" + input)
    }
    return(
        <div className="input-wrapper">
            <input placeholder = "Type epic games username..." className="SearchBar" value={input} onChange={(e)=> handleChange(e.target.value)}></input>
            <FaSearch onClick={(e)=> goToTracker()}/>
        </div>
    )
}
export default SearchBar;