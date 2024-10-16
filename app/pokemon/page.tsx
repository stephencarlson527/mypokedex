import React from "react";
import PokemonDetail, { PokemonProps } from "../components/PokemonList";

// Server-side function to fetch Pokémon data
const fetchPokemon = async (amount: number): Promise<PokemonProps[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
  const promises = Array.from({ length: amount }, () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return fetch(`${apiUrl}${randomId}`).then((res) => res.json());
  });

  return Promise.all(promises);
};

const PokemonPage = async () => {
  // Fetch initial Pokémon data on the server
  const initialPokemon = await fetchPokemon(20);

  // Pass the initial data to the client component
  return <PokemonDetail initialPokemon={initialPokemon} />;
};

export default PokemonPage;
