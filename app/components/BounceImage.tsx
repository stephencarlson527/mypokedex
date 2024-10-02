"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./BounceImage.module.css"; // Adjust the import path if necessary

const BounceImage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pokemon"); // Replace '/pokemon' with your desired route
  };

  return (
    <div>
      <Image
        className={`${styles.bounce}`}
        src="/images/vecteezy_gameboy-color-cartoon-illustration_8317907.jpg"
        alt="My Pokedex logo"
        width={400}
        height={400} // Increased height to match the width
        priority
      />
      <div className="flex gap-4 items-center flex-col ">
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-white gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          <Image
            className="dark:invert"
            src="/images/pokemon-logo2.png"
            alt="Pokedex logo"
            width={20}
            height={20}
          />
          Surprise Me!
        </button>
      </div>
    </div>
  );
};

export default BounceImage;
