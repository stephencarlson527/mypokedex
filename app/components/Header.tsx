// components/Header.tsx
"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto p-4">
        <Link
          href="/"
          className="text-lg font-bold text-gray-900 dark:text-gray-100"
        >
          MyPokedex
        </Link>
      </div>
    </header>
  );
};

export default Header;
