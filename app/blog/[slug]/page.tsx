import { getPostBySlug, getAllPosts } from "../../../lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { marked } from "marked";
import styles from "./blog-post.module.css";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { title, date, excerpt, imageUrl, content } = post;

  // Parse markdown content into HTML
  const htmlContent = marked(content);

  return (
    <article className={styles.blogPost}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.excerpt}>{excerpt}</p>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src={imageUrl}
            alt={title}
            className={styles.heroImage}
            width={1200}
            height={800}
            priority
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        <div className={styles.postContent}>
          <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: htmlContent }} // Render parsed HTML
          />
        </div>
        <aside className={styles.sidebar}>
          <div className={styles.newsletter}>
            <h3>Weekly Newsletter</h3>
            <p>
              Stay updated with the latest posts, tips, and exclusive content in your inbox.
            </p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </aside>
      </div>
    </article>
  );
}
