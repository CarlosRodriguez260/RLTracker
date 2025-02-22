import { useState } from "react";
import "../CSS/Components/Box.css"

function Box({data, playlist, rank, picture}){

    return(
        <div className="Container">
            <div className="Subcontainer">
                <div>{playlist}</div>
                <img className="Pic" src={picture}></img>
                <div>{rank} || {data}</div>
            </div>
        </div>
    )
}
export default Box;