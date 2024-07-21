// src/components/PokemonCard/PokemonCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonCard.css";

// Import SVG icons
import bugIcon from "../assets/types/bug.svg";
import dragonIcon from "../assets/types/dragon.svg";
import electricIcon from "../assets/types/electric.svg";
import fairyIcon from "../assets/types/fairy.svg";
import fightingIcon from "../assets/types/fighting.svg";
import fireIcon from "../assets/types/fire.svg";
import flyingIcon from "../assets/types/flying.svg";
import grassIcon from "../assets/types/grass.svg";
import groundIcon from "../assets/types/ground.svg";
import ghostIcon from "../assets/types/ghost.svg";
import iceIcon from "../assets/types/ice.svg";
import normalIcon from "../assets/types/normal.svg";
import poisonIcon from "../assets/types/poison.svg";
import psychicIcon from "../assets/types/psychic.svg";
import rockIcon from "../assets/types/rock.svg";
import waterIcon from "../assets/types/water.svg";
import darkIcon from "../assets/types/dark.svg";

// Map types to icons
const typeIcons = {
  bug: bugIcon,
  dragon: dragonIcon,
  electric: electricIcon,
  fairy: fairyIcon,
  fighting: fightingIcon,
  fire: fireIcon,
  flying: flyingIcon,
  grass: grassIcon,
  ground: groundIcon,
  ghost: ghostIcon,
  ice: iceIcon,
  normal: normalIcon,
  poison: poisonIcon,
  psychic: psychicIcon,
  rock: rockIcon,
  water: waterIcon,
  dark: darkIcon,
};

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  // Determine the background color based on Pokémon types
  const backgroundColor =
    pokemon.types.length > 0 ? typeColor[pokemon.types[0].type.name] : "#fff";

  return (
    <div
      className="pokemon-card"
      onClick={handleCardClick}
      style={{
        "--hover-bg-color": backgroundColor,
      }}
    >
      <img
        className="pokemon-img"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <p className="pokemon-name">{pokemon.name}</p>
      <div className="pokemon-types">
        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.type.name} className={typeInfo.type.name}>
            <img
              loading="lazy"
              width={18}
              src={typeIcons[typeInfo.type.name]}
              alt={typeInfo.type.name}
            />
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
