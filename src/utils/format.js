// utils/format.js
export const formatHeight = (height) => `${(height / 10).toFixed(1)} m`;
export const formatWeight = (weight) => `${(weight / 10).toFixed(1)} kg`;


// utils/format.js
export const formatGenerationTitle = (generationKey) => {
  const generationMap = {
    "generation-i": "Generation I",
    "generation-ii": "Generation II",
    "generation-iii": "Generation III",
    "generation-iv": "Generation IV",
    "generation-v": "Generation V",
    "generation-vi": "Generation VI",
    "generation-vii": "Generation VII",
    "generation-viii": "Generation VIII",
    "generation-ix": "Generation IX",
  };
  return generationMap[generationKey] || generationKey;
};
