// Main Page for searching player
import SearchBar from '../Components/SearchBar';
import ChatSearchBar from '../Components/ChatSearchBar';
import Navbar from '../Components/Navbar';
import '../CSS/JavaScript/Menu.css'
function Menu(){

    return(
    <>
        <Navbar />
        <div className="Menu">
            <header>Welcome to my Rocket League Tracker and more!</header>
            <div className="Bar">
                <SearchBar />
            </div>
            <div className="Bar">
                <ChatSearchBar />
            </div>
        </div>
    </>
    )
}
export default Menu;