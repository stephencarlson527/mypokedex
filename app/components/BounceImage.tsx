"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./BounceImage.module.css"; // Adjust the import path if necessary
import Button from "./Button";

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
      <Button handleClick={handleClick} buttonText="Enter Pokedex"/>
    </div>
  );
};

export default BounceImage;
