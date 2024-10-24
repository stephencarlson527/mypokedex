import React from 'react';

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sortOption: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="w-full max-w-xs mx-auto mb-4">
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
        Sort Pokémon ( 20 at a time ):
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Select sorting option...
        </option>
        <option value="id-asc">Pokémon Number Ascending</option>
        <option value="id-desc">Pokémon Number Descending</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="height-asc">Height Short-Tall</option>
        <option value="height-desc">Height Tall-Short</option>
        <option value="weight-asc">Weight Light-Heavy</option>
        <option value="weight-desc">Weight Heavy-Light</option>
        <option value="base_experience-asc">Base Experience Low-High</option>
        <option value="base_experience-desc">Base Experience High-Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
