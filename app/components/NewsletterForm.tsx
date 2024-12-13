"use client";

import { useState } from "react";
import styles from "./NewsletterForm.module.css"; // Adjust the path as necessary

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle email submission, e.g., call an API endpoint
    console.log("Submitted email:", email);
  };

  return (
    <form className={styles.newsletterForm} onSubmit={handleSubmit}>
      <input
        type="email"
        className={styles.input}
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">
        Subscribe
      </button>
    </form>
  );
}
