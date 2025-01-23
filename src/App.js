import logo from './logo.svg';
import './App.css';
import { Routes, Route, Nagivate, BrowserRouter} from 'react-router-dom';
import Menu from './JavaScript/Menu'
import Tracker from './JavaScript/Tracker'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='Tracker/:epicName' element={<Tracker />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
