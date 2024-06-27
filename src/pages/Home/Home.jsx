// src/pages/Home/Home.jsx
import React, { useState } from "react";
import "./Home.css";
import logo from "../../assets/images/catchall.png";
import PokemonList from "../../components/PokemonList";
import icon from "../../assets/images/poki1.png";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="logo-search-container">

        <div className="logo-container">
          <img src={logo} alt="hero" className="logo" />
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <img src={icon} alt="Search" className="search-icon" />
          </button>
        </div>
        
      </div>
      <PokemonList searchTerm={searchTerm} />
    </>
  );
};

export default Home;
