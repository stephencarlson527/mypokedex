import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicImagesDirectory = path.join(process.cwd(), 'public', 'images');

// Helper function to get the image path from the public folder
function getLocalImagePath(slug: string): string {
  const sanitizedSlug = slug.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `/images/${sanitizedSlug}.jpg`;
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string; // Optional if not every post has an excerpt
  imageUrl?: string; // Optional since we add it dynamically if missing
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const sanitizedSlug = slug.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Check for the local image
      const imagePath = path.join(publicImagesDirectory, `${sanitizedSlug}.jpg`);
      const imageExists = fs.existsSync(imagePath);

      const imageUrl = imageExists
        ? `/images/${sanitizedSlug}.jpg`
        : '/images/pokemon-game-boy-vector.jpg'; // Fallback image

      return {
        slug,
        ...data,
        imageUrl,
        content,
      } as BlogPost;
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}


export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Add a local image URL based on the slug
    const localImagePath = getLocalImagePath(slug);
    const imageUrl = fs.existsSync(path.join(publicImagesDirectory, `${slug}.jpg`))
      ? localImagePath
      : '/images/pokemon-game-boy-vector.jpg'; // Fallback image

    // Ensure required properties are present
    const title = data.title || "Untitled Post";
    const date = data.date || new Date().toISOString();

    return {
      slug,
      title,
      date,
      excerpt: data.excerpt || "No description available.",
      imageUrl,
      content,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

