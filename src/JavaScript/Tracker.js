// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"

export default function Tracker({epicName}) {
    const params = useParams()

    return(
        <div className="Tracker">
            <header>Stats for {params.epicName}</header>
        </div>
    )
}
