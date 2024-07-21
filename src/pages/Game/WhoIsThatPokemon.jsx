import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WhoIsThatPokemon.css";

const WhoIsThatPokemon = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );
  const [health, setHealth] = useState(3);
  // const [timer, setTimer] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  // useEffect(() => {
  //   let interval;
  //   if (!isGameOver && timer > 0 && !showAnswer) {
  //     interval = setInterval(() => {
  //       setTimer((prev) => prev - 1);
  //     }, 1000);
  //   } else if (timer === 0) {
  //     handleWrongAnswer();
  //   }
  //   return () => clearInterval(interval);
  // }, [timer, isGameOver, showAnswer]);

  const fetchPokemonData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch Pokémon data", error);
      return null;
    }
  };

  const fetchPokemonOptions = async (offset) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=3&offset=${offset}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch Pokémon options", error);
      return [];
    }
  };

  const fetchNewQuestion = async () => {
    const randomId = Math.floor(Math.random() * 649) + 1;
    const pokemon = await fetchPokemonData(randomId);

    if (!pokemon) {
      return;
    }

    const offset = Math.floor(Math.random() * 649);
    let optionsData = await fetchPokemonOptions(offset);

    if (optionsData.length < 3) {
      optionsData = await fetchPokemonOptions(0);
    }

    const allOptions = [...optionsData, { name: pokemon.name }];
    setOptions(shuffleArray(allOptions));
    setCurrentQuestion({
      image: pokemon.sprites.other["official-artwork"].front_default,
      correctOption: pokemon.name,
    });
    // setTimer(10);
    setShowAnswer(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionClick = (option) => {
    if (option === currentQuestion.correctOption) {
      setScore(score + 1);
      setShowAnswer(true);
      setTimeout(() => {
        fetchNewQuestion();
      }, 2000);
    } else {
      setShowAnswer(true); // Reveal Pokémon immediately
      setHealth(health - 1);
      if (health - 1 === 0) {
        setIsGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem("highScore", score);
        }
      } else {
        setTimeout(() => {
          fetchNewQuestion();
        }, 2000); // Show the Pokémon for 2 seconds
      }
    }
  };

  const handleWrongAnswer = () => {
    setHealth(health - 1);
    if (health - 1 === 0) {
      setIsGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
      }
    } else {
      setTimeout(() => {
        fetchNewQuestion();
      }, 1000);
    }
  };

  const restartGame = () => {
    setScore(0);
    setHealth(3);
    setIsGameOver(false);
    fetchNewQuestion();
  };

  if (isGameOver) {
    return (
      <div className="game-container">
        <div className="game-over-container">
          <h1>Game Over</h1>
          <img
            src={currentQuestion.image}
            alt="Pokemon"
            className="game-over-image"
          />
          <p>The correct answer was {currentQuestion.correctOption}</p>
          <p>Your Score: {score}</p>
          <p>High Score: {highScore}</p>
          <button className="game-over-button" onClick={restartGame}>
            Restart
          </button>
          <button
            className="game-over-button"
            onClick={() => navigate("/game")}
          >
            Back to Game Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1 className="game-heading">Who's That Pokémon?</h1>

      <div className="game-box">
        {currentQuestion && (
          <>
            <img
              src={currentQuestion.image}
              alt="Pokemon"
              className={`pokemon-image ${showAnswer ? "" : "hidden"}`}
            />
            {showAnswer && (
              <div className="pokemon-name">
                {currentQuestion.correctOption}
              </div>
            )}
          </>
        )}

        <div className="options-container">
          {options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleOptionClick(option.name)}
              disabled={showAnswer}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className="score">Score: {score}</div>
        <div className="high-score">High Score: {highScore}</div>
        <div className="health-container">
          {Array.from({ length: health }).map((_, index) => (
            <img
              key={index}
              src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
              alt="Health"
              className="health-image"
            />
          ))}
        </div>
        {/* <div className="timer">Time Left: {timer}</div> */}
      </div>
    </div>
  );
};

export default WhoIsThatPokemon;
