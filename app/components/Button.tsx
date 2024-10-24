import React from "react";
import Image from "next/image";

interface ButtonProps {
  handleClick: () => void;
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, buttonText }) => {
  return (
    <div className="flex gap-4 items-center flex-col">
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-white gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={handleClick}
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/images/pokemon-logo2.png"
          alt="Pokedex logo"
          width={20}
          height={20}
        />
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
