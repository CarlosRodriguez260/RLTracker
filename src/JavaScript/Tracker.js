// Page for Player Tracker
import "../CSS/JavaScript/Tracker.css"
import { useParams } from "react-router-dom"

export default function Tracker({epicName}) {
    const params = useParams()

    return(
    <p>Your name is {params.epicName}</p>
    )
}
