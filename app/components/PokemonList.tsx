"use client";

import React, { useEffect, useState, useRef } from "react";
import Pokemon from "./Pokemon";
import Header from "./Header";
import LoadingState from "./LoadingState";
import SortDropdown from "./SortDropdown";
import PokemonDetail from "./PokemonDetail";

export interface PokemonProps {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  base_experience: number;
  types: Array<{ type: { name: string } }>; // Add type
  abilities: Array<{ ability: { name: string } }>; // Add abilities
  description?: string; // Add description
  onClick: () => void;
}

interface PokemonDetailProps {
  initialPokemon: PokemonProps[];
}

const fetchMorePokemon = async (
  amount: number,
  loadedIds: Set<number>
): Promise<PokemonProps[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
  const newPokemonPromises: Promise<PokemonProps>[] = [];

  while (newPokemonPromises.length < amount) {
    const randomId = Math.floor(Math.random() * 898) + 1; // Generate random Pokémon ID

    // Only add if this ID hasn't been loaded yet
    if (!loadedIds.has(randomId)) {
      loadedIds.add(randomId); // Mark this ID as loaded
      newPokemonPromises.push(fetch(`${apiUrl}${randomId}`).then((res) => res.json()));
    }
  }

  return Promise.all(newPokemonPromises);
};

const PokemonList: React.FC<PokemonDetailProps> = ({ initialPokemon }) => {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>(initialPokemon);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(""); // Default to empty for no sorting
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonProps | null>(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const loader = useRef<HTMLDivElement | null>(null);
  const loadedIds = useRef<Set<number>>(new Set(initialPokemon.map(pokemon => +pokemon.id))); // Initialize with IDs from initial Pokémon

  const loadMorePokemon = async (amount: number) => {
    setLoading(true);
    setShowLoader(false);

    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const newPokemon = await fetchMorePokemon(amount, loadedIds.current);
    setPokemonList((prev) => [...prev, ...newPokemon]); // Append new Pokémon at the end
    setLoading(false);
    setShowLoader(false);
    clearTimeout(loaderTimeout);
  };

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
      loadMorePokemon(20);
    }
  }, [page]);

  useEffect(() => {
    // Sort only when the user selects a valid option
    if (sortBy) {
      const [sortProperty, order] = sortBy.split('-'); // Split to get property and order
      const sortedList = [...pokemonList].sort((a, b) => {
        let comparison = 0;

        if (sortProperty === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortProperty === "height") {
          comparison = a.height - b.height;
        } else if (sortProperty === "weight") {
          comparison = a.weight - b.weight;
        } else if (sortProperty === "base_experience") {
          comparison = a.base_experience - b.base_experience;
        }

        return order === "asc" ? comparison : -comparison; // Return in ascending or descending order
      });
      setPokemonList(sortedList);
    }
  }, [sortBy]);

  const openModal = (pokemon: PokemonProps) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="m-16 flex flex-col items-center justify-center min-h-screen">
        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {pokemonList.map((pokemon) => (
            <Pokemon
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              sprites={pokemon.sprites}
              height={pokemon.height}
              weight={pokemon.weight}
              base_experience={pokemon.base_experience}
              types={pokemon.types}
              abilities={pokemon.abilities}
              onClick={() => openModal(pokemon)} // Open modal on click
            />
          ))}
        </div>
        <div ref={loader} className="loader mt-4">
          <LoadingState loading={loading} showLoader={showLoader} />
        </div>
      </div>
      <PokemonDetail
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        pokemon={selectedPokemon}
      />
    </div>
  );
};

export default PokemonList;
