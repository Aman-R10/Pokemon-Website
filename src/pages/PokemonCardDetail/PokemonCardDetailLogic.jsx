import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const fetchPokemonDetails = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
};

const fetchPokemonSpecies = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  return response.json();
};

const fetchEvolutionChain = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  const fetchEvolutions = async (evolutions, chain) => {
    const evoData = chain.evolves_to;

    for (const evo of evoData) {
      const evoDetails = {
        name: evo.species.name,
        id: evo.species.url.split("/").slice(-2, -1)[0],
      };
      const evoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoDetails.id}`);
      const evoImage = await evoResponse.json();
      evoDetails.image = evoImage.sprites.other["official-artwork"].front_default;
      evolutions.push(evoDetails);
      if (evo.evolves_to.length > 0) {
        await fetchEvolutions(evolutions, evo);
      }
    }
    return evolutions;
  };

  const initialEvolution = {
    name: data.chain.species.name,
    id: data.chain.species.url.split("/").slice(-2, -1)[0],
  };

  const initialResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${initialEvolution.id}`);
  const initialImage = await initialResponse.json();
  initialEvolution.image = initialImage.sprites.other["official-artwork"].front_default;

  const evolutions = [initialEvolution];
  await fetchEvolutions(evolutions, data.chain);

  return evolutions;
};

const fetchPokemonEncounters = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch encounters data for Pokemon ${id}`);
    }
    const data = await response.json();
    return data.map((encounter) => encounter.location_area.name);
  } catch (error) {
    console.error('Error fetching encounter locations:', error);
    return []; // Return empty array on error
  }
};

const fetchAllPokemonLocations = async (evolutionChain) => {
  const locationPromises = evolutionChain.map((evolution) => fetchPokemonEncounters(evolution.id));
  const locationsData = await Promise.all(locationPromises);

  // If any evolution stage lacks location data, use the base form's locations
  const baseLocations = locationsData[0];
  return locationsData.map((locations) => (locations.length === 0 ? baseLocations : locations));
};

const PokemonCardDetailLogic = () => {
  const { id } = useParams();

  const { data: pokemon, error: pokemonError, isLoading: pokemonLoading } = useQuery(
    ["pokemonDetails", id],
    () => fetchPokemonDetails(id)
  );

  const { data: speciesData, error: speciesError, isLoading: speciesLoading } = useQuery(
    ["pokemonSpecies", id],
    () => fetchPokemonSpecies(id)
  );

  const { data: evolutionChain, error: evolutionError, isLoading: evolutionLoading } = useQuery(
    ["evolutionChain", speciesData?.evolution_chain.url],
    () => fetchEvolutionChain(speciesData?.evolution_chain.url),
    {
      enabled: !!speciesData?.evolution_chain.url,
    }
  );

  const { data: locations, error: locationsError, isLoading: locationsLoading } = useQuery(
    ["pokemonEncounters", evolutionChain],
    () => fetchAllPokemonLocations(evolutionChain),
    {
      enabled: !!evolutionChain,
    }
  );

  if (pokemonLoading || speciesLoading || locationsLoading || evolutionLoading) {
    return <div>Loading...</div>;
  }

  if (pokemonError || speciesError || locationsError || evolutionError) {
    return <div>Error fetching data. Please try again.</div>;
  }

  return {
    pokemon,
    speciesData,
    evolutionChain,
    locations: locations[0], // Return locations for the base form
  };
};

export default PokemonCardDetailLogic;
