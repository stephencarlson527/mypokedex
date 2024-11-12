"use client";

import React from "react";
import Image from "next/image"; // Import Next.js Image component
import styles from "./Pokemon.module.css"; // Adjust the import path if necessary
import { PokemonProps } from "../components/PokemonList";

const Pokemon: React.FC<PokemonProps> = ({
  name,
  sprites,
  types,
  onClick,
  id,
  // abilities,
}) => {

  return (
    <div className={`${styles.card}`} onClick={onClick}>
      {/* Use Next.js Image component to render the SVG */}
      <Image
        className={styles.pokemonImage}
        src={`/images/pokemon-sugimori/pokemon/sugimori/${id}.png` || sprites?.showdown || sprites.front_default}
        alt={name}
        width={175}
        height={175}
      />
      <h2 className="text-1xl mb-2">
      #{id} <span className="font-bold">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      </h2>
      {/* <h5 className="text-xl"></h5> */}

      

      {/* Types */}
      <p className={styles.pokemonStats}>
        <strong>Type(s):</strong> {types.map((t) => t.type.name).join(', ')}
      </p>

      {/* Weaknesses - Placeholder for weaknesses, typically calculated based on type */}
      {/* <p className={styles.pokemonStats}>
        <strong>Weaknesses:</strong> {/* Add logic to fetch weaknesses
      </p> */}

      {/* Phase of Evolution - Placeholder, can be determined based on the evolution chain */}
      {/* <p className={styles.pokemonStats}>
        <strong>Phase of Evolution:</strong> {/* Add logic for evolution phase
      </p> */}

      {/* Abilities */}
      {/* <p className={styles.pokemonStats}>
        <strong>Abilities:</strong> {abilities.map((a) => a.ability.name).join(', ')}
      </p> */}
    </div>
  );
};

export default Pokemon;
