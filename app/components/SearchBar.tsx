// components/SearchBar.tsx
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  hasError: boolean; // Indicates if there are no search results
}

export default function SearchBar({ onSearch, hasError }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger search in parent component
  };

  return (
    <div className="flex flex-col items-center me-8" style={{ width: 350 }}>
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Pokémon by name or ID..."
          className={`w-full px-4 py-2 text-gray-700 bg-white border ${
            hasError ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 106.32 12.906l5.387 5.387a1 1 0 001.414-1.414l-5.387-5.387A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>
        </div>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-2">
          No Pokémon found matching `&quot`{query}`&quot`
        </p>
      )}
    </div>
  );
}
