// components/PokemonSkeleton.tsx
import React from "react";

const PokemonSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 h-[250px] w-[200px] bg-gray-100">
      <div className="bg-gray-300 rounded-full h-[100px] w-[100px] mb-4"></div>
      <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
};

export default PokemonSkeleton;
