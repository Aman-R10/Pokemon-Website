// src/components/PokemonList/PokemonList.jsx
import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import './PokemonList.css';

const PokemonList = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = [];
      for (let i = 1; i <= 649; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
      }
      const results = await Promise.all(promises);
      setPokemonList(results);
    };

    fetchPokemon();
  }, []);

  const filteredPokemonList = pokemonList.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pokemon.id.toString() === searchTerm;
  });

  return (
    <div className="pokemon-list">
      {filteredPokemonList.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
