// src/components/PokemonCard/PokemonCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      <p className="pokemon-name">{pokemon.name}</p>
      <p className="pokemon-id">ID: #{pokemon.id}</p>
      <p className="pokemon-type">
        Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}
      </p>
    </div>
  );
};

export default PokemonCard;