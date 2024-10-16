// PokemonDetailModal.tsx
import React from "react";
import Modal from "react-modal";
import { PokemonProps } from "./PokemonList"; // Adjust the import based on your structure
import Home from "../page";

interface PokemonDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pokemon: PokemonProps | null;
}

const PokemonDetail: React.FC<PokemonDetailModalProps> = ({
  isOpen,
  onRequestClose,
  pokemon,
}) => {
  if (!pokemon) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Pokemon Details"
      className="modal"
      overlayClassName="overlay"
      appElement={<Home />}
    >
      <div className="flex">
        {/* First Column: Pokémon Image with Name and Number */}
        <div className="flex flex-col items-center w-1/3">
          <h2 className="text-xl font-bold">
            #{pokemon.id} {pokemon.name}
          </h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-40 h-40"
          />
        </div>

        {/* Second Column: Headings */}
        <div className="w-1/3">
          <h3 className="font-bold">Details</h3>
          <p>Type</p>
          <p>Description</p>
          <p>Abilities</p>
          <p>Height</p>
          <p>Weight</p>
        </div>

        {/* Third Column: Details */}
        <div className="w-1/3">
          <p>{pokemon.types.map(type => type.type.name).join(", ")}</p>
          <p>{pokemon.description || "No description available."}</p>
          <p>{pokemon.abilities.map(ability => ability.ability.name).join(", ")}</p>
          <p>{pokemon.height}</p>
          <p>{pokemon.weight}</p>
        </div>
      </div>
      <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Close
      </button>
    </Modal>
  );
};

export default PokemonDetail;
