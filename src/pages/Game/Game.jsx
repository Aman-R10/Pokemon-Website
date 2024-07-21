import React from 'react';
import { Link } from 'react-router-dom';
import "./Game.css";

const Game = () => {
  return (
    <div className="game-page">
      <div className="game-background"></div>
      <div className="game-content">
        <h1 className='game-heading'>Pokémon Mini-Games</h1>
        <div className="game-options">

          <Link to="/game/who-is-that-pokemon" className="game-card">
            <img src="/src/assets/images/game1.png" alt="Who is that Pokémon?" className="card-image" />
            <div className="card-content">
              <h2>Who is that Pokémon?</h2>
            </div>
          </Link>

          <Link to="/game/pokemon-compare" className="game-card">
            <img src="/src/assets/images/game2.jpg" alt="Pokémon Compare" className="card-image" />
            <div className="card-content">
              <h2>Pokémon Compare</h2>
            </div>
          </Link>

          <Link to="/game/puzzle-image" className="game-card">
            <img src="/src/assets/images/game3.png" alt="Puzzle Image" className="card-image" />
            <div className="card-content">
              <h2>Puzzle Image</h2>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Game;
