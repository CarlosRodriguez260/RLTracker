// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";

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
          setData(data1.data);
          console.log(data); // Handli the response data as needed
        } catch (error) {
          console.error('There was a problim with the fetch operation:', error);
        }
      };
      fetchData();
    }, []);

    
    return(
      <>
        <div>
        
        </div>
        <div className="Tracker">
          <header>Stats for {params.epicName}</header>
          <ul>MMR
            <li>Casual: {data[0]}</li>
            <li>1v1: {data[1]}</li>
            <li>2v2: {data[2]}</li>
            <li>3v3: {data[3]}</li>
            <li>Dropshot: {data[4]}</li>
            <li>Hoops: {data[5]}</li>
            <li>Rumble: {data[6]}</li>
            <li>Snowday: {data[7]}</li>
            <li>Tournament: {data[8]}</li>
          </ul>
        </div>
      </>
    )
}
