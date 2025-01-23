// Main Page for searching player
import SearchBar from '../Components/SearchBar';
import '../CSS/JavaScript/Menu.css'
function Menu(){

    return(
    <div className="Menu">
        <header>Welcome to my Rocket League Tracker!</header>
        <div className="Bar">
            <SearchBar />
        </div>
    </div>
    )
}
export default Menu;