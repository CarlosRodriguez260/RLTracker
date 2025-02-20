// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios"

export default function Tracker({epicName}) {
    const params = useParams()
    const url = "https://rocketleague.tracker.network/rocket-league/profile/epic/" + params.epicName + "/overview"
    const [data,setData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data1 = await response.json();
          setData(data1);
          console.log(data1); // Handle the response data as needed
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      fetchData();
    }, []);

    
    return(
        <div className="Tracker">
            <header>Stats for {params.epicName}</header>
            <ul>{[data]}</ul>
        </div>
    )
}
