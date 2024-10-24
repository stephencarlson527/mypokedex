import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sortOption: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy }) => {
  const options = [
    { value: 'id-asc', label: 'Pokémon Number Ascending' },
    { value: 'id-desc', label: 'Pokémon Number Descending' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'height-asc', label: 'Height Short-Tall' },
    { value: 'height-desc', label: 'Height Tall-Short' },
    { value: 'weight-asc', label: 'Weight Light-Heavy' },
    { value: 'weight-desc', label: 'Weight Heavy-Light' },
    { value: 'base_experience-asc', label: 'Base Experience Low-High' },
    { value: 'base_experience-desc', label: 'Base Experience High-Low' }
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Sort Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        {options.map((option) => (
          <div key={option.value} className="py-1">
            <MenuItem>
              {({ active }) => (
                <a
                  href="#"
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </a>
              )}
            </MenuItem>
          </div>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default SortDropdown;
