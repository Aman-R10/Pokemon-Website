import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import PokemonCardDetailLogic from "./PokemonCardDetailLogic";
import "./PokemonCardDetail.css";

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
  const { pokemon, speciesData, evolutionChain, locations } = PokemonCardDetailLogic();
  const [section, setSection] = useState('about');
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
          typeData.damage_relations.double_damage_from.forEach(weakness =>
            newWeaknesses.add(weakness.name)
          );
        } catch (error) {
          console.error(`Error fetching weaknesses for ${type.type.name}:`, error);
        }
      }
      setWeaknesses([...newWeaknesses]);

      // Fetch all moves with additional attributes (power, pp, accuracy)
      const allMoves = pokemon.moves.map(async move => {
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
      Promise.all(allMoves).then(moveData => setMoves(moveData));
    };

    fetchPokemonData();
  }, [pokemon, speciesData]);

  if (!pokemon || !speciesData) return <div>Loading...</div>;

  const { name, id: pokemonId, types, height, weight, abilities, stats } = pokemon;
  const { flavor_text_entries, gender_rate, genera, generation } = speciesData;

  const description = flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
  const gender = gender_rate === -1 ? "None" : gender_rate === 8 ? "Female" : gender_rate === 0 ? "Male" : "Male, Female";
  const category = genera.find(genus => genus.language.name === "en").genus;
  const generationName = generation.name;

  // Determine the background color for the back button
  const backArrowColor = typeColor[types[0].type.name]; // Assuming the first type determines the color

  return (
    <div className="pokemon-detail">
      <div className="back-arrow">
        <Link to="/" className="back-button" style={{ color: backArrowColor }}>
          <FaArrowCircleLeft />
        </Link>
      </div>
      <div className="content">
        <div className="left">
          <h2>{name.toUpperCase()}</h2>
          <p>ID: #{pokemonId}</p>
          <img src={pokemon.sprites.other.dream_world.front_default} alt={name} />
          <div className="evolution-chain">
            <h3>Evolution Chain:</h3>
            {evolutionChain && evolutionChain.length > 0 && evolutionChain.map((evolution, index) => (
              <div key={index} className="evolution">
                <img src={evolution.image} alt={evolution.name} />
                <p>{evolution.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="navigation">
            <button onClick={() => setSection('about')}>About</button>
            <button onClick={() => setSection('moves')}>MovePool</button>
            <button onClick={() => setSection('stats')}>Stats</button>
          </div>
          <div className="info">
            {section === 'about' && (
              <div>
                <p>Type: {types.map(type => type.type.name).join(", ")}</p>
                <p>Description: {description}</p>
                <p>Weaknesses: {weaknesses.join(", ")}</p>
                <p>Height: {height}</p>
                <p>Weight: {weight}</p>
                <p>Gender: {gender}</p>
                <p>Category: {category}</p>
                <p>Generation: {generationName}</p>
                <p>Abilities: {abilities.map(ability => ability.ability.name).join(", ")}</p>
                <p>Location: {locations.join(", ")}</p>
              </div>
            )}
            {section === 'moves' && (
              <div>
                <h3>Moves:</h3>
                <ul>
                  {moves.map((move, index) => (
                    <li key={index}>
                      <strong>{move.name}</strong> - Power: {move.power} - PP: {move.pp} - Accuracy: {move.accuracy} - Category: {move.category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {section === 'stats' && (
              <div>
                <h3>Stats:</h3>
                {stats.map(stat => (
                  <div key={stat.stat.name}>
                    <p>{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardDetail;
