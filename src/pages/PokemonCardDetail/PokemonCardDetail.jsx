import React, { useState, useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PokemonCardDetailLogic from "./PokemonCardDetailLogic";
import "./PokemonCardDetail.css";
import DetailCard from "../../components/DetailCard";
import "../../components/DetailCard.css";
import { formatHeight, formatWeight } from "../../utils/format";

// Import SVG icons
import bugIcon from "../../assets/types/bug.svg";
import dragonIcon from "../../assets/types/dragon.svg";
import electricIcon from "../../assets/types/electric.svg";
import fairyIcon from "../../assets/types/fairy.svg";
import fightingIcon from "../../assets/types/fighting.svg";
import fireIcon from "../../assets/types/fire.svg";
import flyingIcon from "../../assets/types/flying.svg";
import grassIcon from "../../assets/types/grass.svg";
import groundIcon from "../../assets/types/ground.svg";
import ghostIcon from "../../assets/types/ghost.svg";
import iceIcon from "../../assets/types/ice.svg";
import normalIcon from "../../assets/types/normal.svg";
import poisonIcon from "../../assets/types/poison.svg";
import psychicIcon from "../../assets/types/psychic.svg";
import rockIcon from "../../assets/types/rock.svg";
import waterIcon from "../../assets/types/water.svg";
import darkIcon from "../../assets/types/dark.svg";

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

const PokemonCardDetail = () => {
  const { pokemon, speciesData, evolutionChain, locations } =
    PokemonCardDetailLogic();
  const [section, setSection] = useState("about");
  const [weaknesses, setWeaknesses] = useState([]);
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!pokemon || !speciesData) return;

      // Fetch weaknesses
      const newWeaknesses = new Set();
      for (const type of pokemon.types) {
        try {
          const typeResponse = await fetch(type.type.url);
          const typeData = await typeResponse.json();
          typeData.damage_relations.double_damage_from.forEach((weakness) =>
            newWeaknesses.add(weakness.name)
          );
        } catch (error) {
          console.error(
            `Error fetching weaknesses for ${type.type.name}:`,
            error
          );
        }
      }
      setWeaknesses([...newWeaknesses]);

      // Fetch all moves with additional attributes (power, pp, accuracy)
      const allMoves = pokemon.moves.map(async (move) => {
        const moveResponse = await fetch(move.move.url);
        const moveData = await moveResponse.json();
        return {
          name: moveData.name,
          category: moveData.damage_class.name,
          power: moveData.power,
          pp: moveData.pp,
          accuracy: moveData.accuracy,
        };
      });
      Promise.all(allMoves).then((moveData) => setMoves(moveData));
    };

    fetchPokemonData();
  }, [pokemon, speciesData]);

  if (!pokemon || !speciesData) return <div>Loading...</div>;

  const {
    name,
    id: pokemonId,
    types,
    height,
    weight,
    abilities,
    stats,
  } = pokemon;
  const { flavor_text_entries, gender_rate, genera, generation } = speciesData;

  const description = flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  ).flavor_text;
  const gender =
    gender_rate === -1
      ? "None"
      : gender_rate === 8
      ? "Female"
      : gender_rate === 0
      ? "Male"
      : "Male, Female";
  const category = genera.find((genus) => genus.language.name === "en").genus;
  const generationName = generation.name;

  // Determine the background color for the back button
  const backArrowColor = typeColor[types[0].type.name]; // Assuming the first type determines the color
  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  // Update CSS variable for underline color
  document.documentElement.style.setProperty(
    "--underline-color",
    backArrowColor
  );

  return (
    <div className="pokemon-detail">
      {/* Back Arrow Heading*/}
      <div className="back-arrow">
        <Link
          to="/"
          className="back-button"
          style={{ color: backArrowColor, fontSize: 35 }}
        >
          <IoArrowBackCircleOutline />
        </Link>
        <h2 className="home" style={{ color: backArrowColor, fontSize: 30 }}>
          Pokedex
        </h2>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Left Side content. */}
        <div className="left">
          <div className="left-heading">
            <h1>
              {formattedName} <span>ID: #{pokemonId}</span>
            </h1>
          </div>

          <img
            className="glow-image"
            src={pokemon.sprites.other.dream_world.front_default}
            alt={name}
            style={{
              filter: `drop-shadow(0 0 60px ${backArrowColor})`,
            }}
          />

          <h4 className="evolution-heading">Evolutions</h4>
          <div className="evolution-chain">
            {evolutionChain &&
              evolutionChain.length > 0 &&
              evolutionChain.map((evolution, index) => (
                <div key={index} className="evolution">
                  <img src={evolution.image} alt={evolution.name} />
                  <div
                    style={{
                      backgroundColor: backArrowColor,
                    }}
                  ></div>
                  <p>{evolution.name}</p>
                </div>
              ))}
          </div>
        </div>
        {/* Left Side content Ends. */}

        {/* Right Side Content. */}
        <div className="right">
          <div className="navigation">
            <button
              onClick={() => setSection("about")}
              className={section === "about" ? "active" : ""}
            >
              About
            </button>
            <button
              onClick={() => setSection("moves")}
              className={section === "moves" ? "active" : ""}
            >
              MovePool
            </button>
            <button
              onClick={() => setSection("stats")}
              className={section === "stats" ? "active" : ""}
            >
              Stats
            </button>
          </div>
          <div className="info">
            {section === "about" && (
              <div>
                <div className="about-section">
                  <h3>Description:</h3>
                  <p className="desc-para">{description}</p>
                </div>

                <div className="about-section">
                  <div className="types">
                    <p className="type-para">Type:</p>
                    {types.map((type) => (
                      <img
                        key={type.type.name}
                        src={typeIcons[type.type.name]}
                        alt={type.type.name}
                        className="type-icon"
                      />
                    ))}
                  </div>
                </div>
                <div className="card-detail">
                  <DetailCard
                    title={`${
                      generationName.charAt(0).toUpperCase() +
                      generationName.slice(1)
                    }`}
                    data={generationName}
                    isGeneration={true}
                  />

                  <DetailCard title="Height" data={formatHeight(height)} />
                  <DetailCard title="Weight" data={formatWeight(weight)} />
                  <DetailCard title="Gender" data={gender} isGender={true} />
                  <DetailCard title="Category" data={category} />

                  <DetailCard
                    title="Abilities"
                    data={abilities
                      .map((ability) => ability.ability.name)
                      .join(", ")}
                  />
                </div>

                <div className="about-section">
                  <h3>Location:</h3>
                  <p>{locations.join(", ")}</p>
                </div>
              </div>
            )}

            {section === "moves" && (
              <div>
                <div className="about-section">
                  <h3>Weaknesses:</h3>
                  <p>{weaknesses.join(", ")}</p>
                </div>
                <h3>Moves:</h3>
                <ul>
                  {moves.map((move, index) => (
                    <li key={index}>
                      <strong>{move.name}</strong> - Power: {move.power} - PP:{" "}
                      {move.pp} - Accuracy: {move.accuracy} - Category:{" "}
                      {move.category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {section === "stats" && (
              <div>
                <div className="about-section">
                  <h3>Weaknesses:</h3>
                  <p>{weaknesses.join(", ")}</p>
                </div>
                <h3>Stats:</h3>
                {stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <p>
                      {stat.stat.name.toUpperCase()}: {stat.base_stat}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Right Side Content Ends */}
      </div>
    </div>
  );
};

export default PokemonCardDetail;
