import './App.css';
import Login from './Login';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/create-game" element={<Game/>}/>

    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
