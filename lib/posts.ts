import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NekosAPIv1 } from 'nekosapi';

const postsDirectory = path.join(process.cwd(), 'posts');
const nekos = new NekosAPIv1();

// Fetch a random image from Neko's API
async function fetchRandomImage(category: string = "catgirl") {
  try {
    const images = await nekos.getRandomImages(category, 1); // Pass category and limit
    if (images.length > 0) {
      return images[0]; // Return the first image object
    } else {
      console.warn(`No images found for category: ${category}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching random image from Neko's API:", error);
    return null;
  }
}

export async function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          ...data,
          content,
        };
      })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

