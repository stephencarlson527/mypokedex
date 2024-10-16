// SortDropdown.tsx
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
    <select value={sortBy} onChange={handleChange} className="mb-4 p-2">
      <option value="">Sort by...</option> {/* Default option */}
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
      <option value="height-asc">Height Short-Tall</option>
      <option value="height-desc">Height Tall-Short</option>
      <option value="weight-asc">Weight Light-Heavy</option>
      <option value="weight-desc">Weight Heavy-Light</option>
      <option value="base_experience-asc">Base Experience Low-High</option>
      <option value="base_experience-desc">Base Experience High-Low</option>
    </select>
  );
};

export default SortDropdown;
