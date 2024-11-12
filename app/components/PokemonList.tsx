// components/PokemonList.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Pokemon from "./Pokemon";
import PokemonSkeleton from "./PokemonSkeleton";
import Header from "./Header";
import LoadingState from "./LoadingState";
import SortDropdown from "./SortDropdown";
import PokemonDetail from "./PokemonDetail";
import SearchBar from "./SearchBar";
import Button from "./Button";

export interface PokemonProps {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    showdown?: string;
  };
  height: number;
  weight: number;
  base_experience: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  description?: string;
  onClick: () => void;
}

interface PokemonDetailProps {
  initialPokemon: PokemonProps[];
}

const fetchMorePokemon = async (
  amount: number,
  lastLoadedId: number
): Promise<PokemonProps[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
  const showdownBaseUrl = process.env.NEXT_PUBLIC_SHOWDNOWN_BASE_URL;

  const newPokemonPromises: Promise<PokemonProps>[] = [];

  for (let i = lastLoadedId + 1; i <= lastLoadedId + amount && i <= 721; i++) {
    const pokemonData = await fetch(`${apiUrl}${i}`).then((res) => res.json());
    const showdownSpriteUrl = `${showdownBaseUrl}${pokemonData.name.toLowerCase()}.gif`;

    newPokemonPromises.push(
      Promise.resolve({
        ...pokemonData,
        sprites: {
          ...pokemonData.sprites,
          showdown: showdownSpriteUrl,
        },
      })
    );
  }

  return Promise.all(newPokemonPromises);
};

const PokemonList: React.FC<PokemonDetailProps> = ({ initialPokemon }) => {
  const [pokemonList, setPokemonList] = useState<PokemonProps[]>(initialPokemon);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonProps[]>(initialPokemon);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const lastLoadedId = useRef<number>(initialPokemon.length);
  const [showBackToTop, setShowBackToTop] = useState(false); // State to manage visibility of "Back to Top" button
  const [isSearching, setIsSearching] = useState(false); // Track if a search is in progress
  const [hasError, setHasError] = useState(false); // Track if search returned no results

  const loadMorePokemon = async (amount: number) => {
    if (lastLoadedId.current >= 721) {
      setShowLoader(false);
      return;
    }

    setLoading(true);
    setShowLoader(false);

    const loaderTimeout = setTimeout(() => {
      setShowLoader(true);
    }, 500);

    const newPokemon = await fetchMorePokemon(amount, lastLoadedId.current);
    setPokemonList((prev) => [...prev, ...newPokemon]);
    setFilteredPokemon((prev) => [...prev, ...newPokemon]);

    lastLoadedId.current += newPokemon.length; // Update lastLoadedId by the actual number of Pokémon loaded
    setLoading(false);
    setShowLoader(false);
    clearTimeout(loaderTimeout);
  };

  const handleScroll = () => {
    if (searchBarRef.current) {
      const { bottom } = searchBarRef.current.getBoundingClientRect();
      setShowBackToTop(bottom <= 0); // Show button only if search bar is out of view
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && lastLoadedId.current < 721) {
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
  }, [loading]);

  useEffect(() => {
    if (page > 1 && lastLoadedId.current < 721) {
      loadMorePokemon(20); // Load 20 more Pokémon on scroll
    }
  }, [page]);

  useEffect(() => {
    if (sortBy) {
      const [sortProperty, order] = sortBy.split("-");
      const sortedList = [...filteredPokemon].sort((a, b) => {
        let comparison = 0;

        if (sortProperty === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortProperty === "height") {
          comparison = a.height - b.height;
        } else if (sortProperty === "weight") {
          comparison = a.weight - b.weight;
        } else if (sortProperty === "base_experience") {
          comparison = a.base_experience - b.base_experience;
        } else if (sortProperty === "id") {
          comparison = a.id - b.id;
        }

        return order === "asc" ? comparison : -comparison;
      });
      setFilteredPokemon(sortedList);
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

  const handlePrevious = () => {
    if (!selectedPokemon) return;
    const currentIndex = filteredPokemon.findIndex(
      (p) => p.id === selectedPokemon.id
    );
    if (currentIndex > 0) {
      const previousPokemon = filteredPokemon[currentIndex - 1];
      setSelectedPokemon(previousPokemon);
    }
  };

  const handleNext = () => {
    if (!selectedPokemon) return;
    const currentIndex = filteredPokemon.findIndex(
      (p) => p.id === selectedPokemon.id
    );
    if (currentIndex < filteredPokemon.length - 1) {
      const nextPokemon = filteredPokemon[currentIndex + 1];
      setSelectedPokemon(nextPokemon);
    }
  };

  const handleSearch = (query: string) => {
    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase();
    const filtered = pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(lowercaseQuery) ||
        pokemon.id.toString().includes(query)
    );
    setFilteredPokemon(filtered);
    setHasError(filtered.length === 0); // Set error if no results
    setIsSearching(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="m-16 flex flex-col items-center justify-center min-h-screen">
        <div ref={searchBarRef} className="flex items-center p-8">
          <SearchBar onSearch={handleSearch} hasError={hasError} />
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {(isSearching || loading || hasError)
            ? Array.from({ length: 20 }).map((_, index) => (
                <PokemonSkeleton key={index} />
              ))
            : filteredPokemon.map((pokemon) => (
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
                  onClick={() => openModal(pokemon)}
                />
              ))}
        </div>
        {lastLoadedId.current < 721 && (
          <div ref={loader} className="loader mt-4">
            <LoadingState loading={loading} showLoader={showLoader} />
          </div>
        )}
      </div>
      <PokemonDetail
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        pokemon={selectedPokemon}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      {showBackToTop && (
        <div className="fixed bottom-4 right-4 p-3 rounded-full">
          <Button handleClick={scrollToTop} buttonText="Back To Top" />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
