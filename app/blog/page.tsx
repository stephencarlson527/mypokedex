import Link from 'next/link';
import Image from 'next/image';
import styles from './blog-grid.module.css';
import { getAllPosts } from '../../lib/posts';

export default async function BlogPage() {
  const posts = await getAllPosts(); // Fetch posts dynamically with images

  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <div
          key={post.slug}
          className={`${styles.card} ${
            index === 0 ? styles.large : index % 3 === 0 ? styles.medium : styles.small
          }`}
        >
          <Link href={`/blog/${post.slug}`}>
            <Image
              src={post.imageUrl} // Use fetched image from Neko's API
              alt={post.title}
              width={800}
              height={600}
              layout="responsive"
              priority={index === 0}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDescription}>{post.excerpt}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
