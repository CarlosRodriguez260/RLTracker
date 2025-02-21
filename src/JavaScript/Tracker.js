// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";


export default function Tracker({epicName}) {
    const params = useParams()
    const url = "https://rocketleague.tracker.network/rocket-league/profile/epic/" + params.epicName + "/overview"
    const [data,setData] = useState([])
    const [playlists,setPlaylists] = useState([])
    const [ranks, setRanks] = useState([])
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
          setData(data1.data)
          setPlaylists(data1.playlist)
          setRanks(data1.rank)
          setDataEmpty(true)
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      fetchData();
    }, [url]);

    return(
      <>
        {data.length === 0 ? (
          <div className="Loader">
              <div className="loadHeader">
                <BallTriangle />
                <div>Loading data...</div>
              </div>
          </div>
        ) : (
          <div className="Tracker">
            <div>
              <header>Stats for {params.epicName}</header>
              <ul>MMR
                {playlists.map((playlist, index) => (
                  <li key={index}>{playlist}: {ranks[index-1]} {data[index]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </>
    )
}
