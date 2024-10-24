import React, { useState } from "react";
import Modal from "react-modal";
import { PokemonProps } from "./PokemonList"; // Adjust the import based on your structure
import styles from "./PokemonDetail.module.css"; // Import custom styles for this modal

interface PokemonDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pokemon: PokemonProps | null;
  onPrevious: () => void;
  onNext: () => void;
}

const PokemonDetail: React.FC<PokemonDetailModalProps> = ({
  isOpen,
  onRequestClose,
  pokemon,
  onPrevious,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState("Summary");

  if (!pokemon) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Pokemon Details"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {/* Close Button (X) */}
      <button onClick={onRequestClose} className={styles.closeButton}>
        &times;
      </button>

      <div className={styles.container}>
        {/* Left Column: Sprite and Navigation Buttons */}
        <div className={styles.leftColumn}>
        <h2>No. {pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h2>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className={styles.sprite}
          />

          {/* Navigation Buttons */}
          <div className={styles.navButtons}>
            <button onClick={onPrevious} className={styles.navButton}>Previous</button>
            <button onClick={onNext} className={styles.navButton}>Next</button>
          </div>
        </div>

        {/* Right Column: Tabs */}
        <div className={styles.rightColumn}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "Summary" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("Summary")}
            >
              Summary
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Moves" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("Moves")}
            >
              Moves
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Base Stats" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("Base Stats")}
            >
              Base Stats
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Evolution" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("Evolution")}
            >
              Evolution
            </button>
          </div>

          {/* Content under each tab */}
          <div className={styles.tabContent}>
            {activeTab === "Summary" && (
              <div>
                <div className={styles.infoRow}>
                  <div className={styles.infoTitle}>Type</div>
                  <div className={styles.infoContent}>
                    {pokemon.types.map(type => type.type.name).join(' / ')}
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoTitle}>Desc</div>
                  <div className={styles.infoContent}>
                    {pokemon.description || "No description available."}
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoTitle}>Abilities</div>
                  <div className={styles.infoContent}>
                    {pokemon.abilities.map(ability => ability.ability.name).join(' / ')}
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoTitle}>Height</div>
                  <div className={styles.infoContent}>{pokemon.height}'</div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoTitle}>Weight</div>
                  <div className={styles.infoContent}>{pokemon.weight} lbs.</div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab === "Moves" && <div>Moves content will go here.</div>}
            {activeTab === "Base Stats" && <div>Base Stats content will go here.</div>}
            {activeTab === "Evolution" && <div>Evolution content will go here.</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonDetail;
