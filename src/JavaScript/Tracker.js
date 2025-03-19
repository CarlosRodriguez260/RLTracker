// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";
import Box from "../Components/Box";


export default function Tracker({epicName}) {
    const params = useParams()
    const url = "https://rocketleague.tracker.network/rocket-league/profile/epic/" + params.epicName + "/overview"
    const [data,setData] = useState([])
    const [playlists,setPlaylists] = useState([])
    const [ranks, setRanks] = useState([])
    const [pictures, setPictures] = useState([])
    const [dataEmpty, setDataEmpty] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        try {
          // The IP here depends on the computer hosting the backend
          const response = await fetch('http://192.168.68.51:5000/scrape', {
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
          setPictures(data1.picture)
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
              <header className="h1">Stats for {params.epicName}</header>
            </div>

            <div className="Boxes">
              <Box data={data[1]} playlist={playlists[1]} rank={ranks[0]} picture={pictures[1]}/>
              <Box data={data[2]} playlist={playlists[2]} rank={ranks[1]} picture={pictures[2]}/>
              <Box data={data[3]} playlist={playlists[3]} rank={ranks[2]} picture={pictures[3]}/>
            </div>
    
            <div className="Boxes">
              <Box data={data[4]} playlist={playlists[4]} rank={ranks[3]} picture={pictures[4]}/>
              <Box data={data[5]} playlist={playlists[5]} rank={ranks[4]} picture={pictures[5]}/>
              <Box data={data[6]} playlist={playlists[6]} rank={ranks[5]} picture={pictures[6]}/>
            </div>

            <div className="Boxes">
              <Box data={data[7]} playlist={playlists[7]} rank={ranks[6]} picture={pictures[7]}/>
              {/* <Box data={data[8]} playlist={playlists[8]} rank={ranks[7]} picture={pictures[8]}/> */}
            </div>
          </div>
        )}
    </>
    )
}
