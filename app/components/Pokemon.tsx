"use client";

import React from "react";
import styles from "./Pokemon.module.css"; // Adjust the import path if necessary
import { PokemonProps } from "../pokemon/page";

const Pokemon: React.FC<PokemonProps> = ({ name, sprites, height, weight, base_experience }) => {
  return (
    <div className={styles.card}>
      <h2 className="text-2xl font-bold mb-2">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img className={styles.pokemonImage} src={sprites.front_default} alt={name} />
      <p className={styles.pokemonStats}>Height: {height} decimetres</p>
      <p className={styles.pokemonStats}>Weight: {weight} hectograms</p>
      <p className={styles.pokemonStats}>Base Experience: {base_experience}</p>
    </div>
  );
};

export default Pokemon;
