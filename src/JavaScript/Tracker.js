// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios"

export default function Tracker({epicName}) {
    const params = useParams()
    const url = "https://rocketleague.tracker.network/rocket-league/profile/epic/" + params.epicName + "/overview"

    const [data, setData] = useState([]);
    useEffect(()=> {
      const response = fetch('http://127.0.0.1:5000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    }, setData(response));}, [])

    
    return(
        <div className="Tracker">
            <header>Stats for {params.epicName}</header>
            <ul></ul>
        </div>
    )
}
