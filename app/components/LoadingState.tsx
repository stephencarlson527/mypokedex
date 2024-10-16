"use client";

import React from "react";

interface LoadingStateProps {
  loading: boolean;
  showLoader: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loading, showLoader }) => {
  if (!loading || !showLoader) {
    return null;
  }

  return <p>Loading more Pokémon...</p>;
};

export default LoadingState;
