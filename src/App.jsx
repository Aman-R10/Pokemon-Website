import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Favorite from './pages/Favorite/Favorite';
import Game from './pages/Game/Game';
import About from './pages/About/About';
import PokemonCardDetail from './pages/PokemonCardDetail/PokemonCardDetail';
import WhoIsThatPokemon from './pages/Game/WhoIsThatPokemon';
import PokemonCompare from './pages/Game/PokemonCompare';
import PuzzleImage from './pages/Game/PuzzleImage';
import './App.css'; // Adjusted the path

// Create a client
const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith('/pokemon/') && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/who-is-that-pokemon" element={<WhoIsThatPokemon />} />
        <Route path="/game/pokemon-compare" element={<PokemonCompare />} />
        <Route path="/game/puzzle-image" element={<PuzzleImage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pokemon/:id" element={<PokemonCardDetail />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
