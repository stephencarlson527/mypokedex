import Link from "next/link";
import Image from "next/image";
import styles from "./blog-grid.module.css";
import { getAllPosts } from "../../lib/posts";
import NewsletterForm from "../components/NewsletterForm";

export default async function BlogPage() {
  const posts = await getAllPosts(); // Fetch posts dynamically

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <h1 className={styles.siteTitle}>MyPokedex Blog</h1>
          <p className={styles.tagline}>
            Your source for anime collectibles and more.
          </p>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className={styles.mainContent}>
        {/* Intro Section */}
        <section className={styles.introSection}>
          <h2>Welcome to the MyPokedex Blog</h2>
          <p>
            Discover the latest in anime-inspired merchandise, Pokémon
            collectibles, and must-have accessories. Browse our recent posts
            below to explore the world of anime and gaming culture.
          </p>
        </section>

        {/* Blog Posts Grid */}
        <div className={styles.container}>
          {posts.map((post, index) => {
            const imageUrl = post.imageUrl || "/images/pokemon-game-boy-vector.jpg"; // Fallback image
            const title = post.title || "Untitled Post"; // Fallback title
            const excerpt = post.excerpt || "No description available."; // Fallback excerpt
            const cardClass =
              index === 0
                ? styles.large
                : index % 3 === 0
                ? styles.medium
                : styles.small;

            return (
              <div key={post.slug} className={`${styles.card} ${cardClass}`}>
                <Link href={`/blog/${post.slug}`} aria-label={`Read more about ${title}`}>
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={800}
                    height={600}
                    priority={index === 0} // Prioritize the first image
                  />
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{title}</h2>
                    <p className={styles.cardDescription}>{excerpt}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      {/* Newsletter Signup Section */}
      <section className={styles.newsletterSection}>
        <h3>Join Our Community</h3>
        <p>
          Subscribe to our newsletter for the latest anime and Pokémon updates,
          and exclusive merch deals.
        </p>
        <NewsletterForm />
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} MyPokedex Blog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
