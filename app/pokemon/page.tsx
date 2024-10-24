import React from "react";
import PokemonList, { PokemonProps } from "../components/PokemonList";

// Server-side function to fetch Pokémon data, including Showdown sprites
const fetchPokemon = async (amount: number): Promise<PokemonProps[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
  const showdownBaseUrl = "https://play.pokemonshowdown.com/sprites/xyani/";

  // Iterate sequentially from Pokémon #1 up to the amount specified
  const promises = Array.from({ length: amount }, async (_, index) => {
    const pokemonId = index + 1; // Start from Pokémon #1, increment for each one
    const pokemonData = await fetch(`${apiUrl}${pokemonId}`).then((res) => res.json());

    // Fetch Pokémon Showdown sprite (using the name from PokeAPI data)
    const showdownSpriteUrl = `${showdownBaseUrl}${pokemonData.name.toLowerCase()}.gif`;

    return {
      ...pokemonData,
      sprites: {
        ...pokemonData.sprites,
        showdown: showdownSpriteUrl, // Add the Showdown sprite URL
      },
    };
  });

  return Promise.all(promises);
};

const PokemonPage = async () => {
  // Fetch initial Pokémon data starting from #1, with the specified amount
  const initialPokemon = await fetchPokemon(20);

  // Pass the initial data to the client component
  return <PokemonList initialPokemon={initialPokemon} />;
};

export default PokemonPage;
