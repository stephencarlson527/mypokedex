"use client";

import React, { useEffect, useState, useRef } from "react";
import Pokemon from "../components/Pokemon";
import Header from "../components/Header";

export interface PokemonProps {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  base_experience: number;
}

const PokemonDetail = () => {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchPokemon = async (amount: number) => {
    setLoading(true);
    const promises = Array.from({ length: amount }, () => {
      const randomId = Math.floor(Math.random() * 898) + 1; // Generate random Pokémon ID
      return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(
        (res) => res.json()
      );
    });

    const newPokemon = await Promise.all(promises);
    setPokemonList((prev) => [...prev, ...newPokemon]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(20); // Fetch 20 Pokémon on the first load
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchPokemon(20); // Fetch more Pokémon when the page changes
    }
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="m-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {pokemonList.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              name={pokemon.name}
              sprites={pokemon.sprites}
              height={pokemon.height}
              weight={pokemon.weight}
              base_experience={pokemon.base_experience}
            />
          ))}
        </div>
        <div ref={loader} className="loader mt-4">
          {loading && <p>Loading more Pokémon...</p>}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
