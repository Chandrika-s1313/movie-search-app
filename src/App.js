import React from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import MovieDashboard from './pages/Home';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieDashboard/>}/>
        <Route path="/movie/:id" element = {<MovieDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
