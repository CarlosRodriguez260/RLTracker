// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";

export default function Tracker({epicName}) {
    const params = useParams()
    const url = "https://rocketleague.tracker.network/rocket-league/profile/epic/" + params.epicName + "/overview"
    const [data,setData] = useState([])
    const [playlists,setPlaylists] = useState([])
    const [dataEmpty, setDataEmpty] = useState(false)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://192.168.68.50:5000/scrape', {
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
          setPlaylists(data1.playlist);
          setDataEmpty(true)
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      fetchData();
    }, [url]);
    return(
      <>
        <div className="loader">{!dataEmpty && <span>Loading</span>}</div>
        <div className="Tracker">{dataEmpty &&  
        <div>
            <header>Stats for {params.epicName}</header>
            <ul>MMR
              <li>{playlists[0]}: {data[0]}</li>
              <li>{playlists[1]}: {data[1]}</li>
              <li>{playlists[2]}: {data[2]}</li>
              <li>{playlists[3]}: {data[3]}</li>
              <li>{playlists[4]}: {data[4]}</li>
              <li>{playlists[5]}: {data[5]}</li>
              <li>{playlists[6]}: {data[6]}</li>
              <li>{playlists[7]}: {data[7]}</li>
              <li>{playlists[8]}: {data[8]}</li>
            </ul>
          </div>
        }</div>
      </>
    )
}
