import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import matter from "gray-matter";
import * as dotenv from "dotenv";
dotenv.config();

const postsDirectory = path.join(process.cwd(), "posts");
const publicImagesDirectory = path.join(process.cwd(), "public", "images");

// Map blog titles or keywords to more specific Unsplash queries
function queryMapping(title) {
  const titleToQueryMap = {
    "Best Anime Merch": "anime hoodie popular",
    "Top Anime Gifts": "anime poster wall art",
    "Anime-Inspired Home Décor": "anime home decor furniture",
    "Best Pokémon Collectibles": "pokemon plush toys",
    "Anime Cosplay Essentials": "anime cosplay outfit",
    "Top Pokémon Games": "pokemon video game setup",
    "The Rarest Pokémon Cards": "pokemon trading cards rare",
    "Ultimate Pokémon Plushies Guide": "pokemon plushies cute",
  };

  // Return the specific query if available, otherwise default to title keywords
  for (const [key, query] of Object.entries(titleToQueryMap)) {
    if (title.includes(key)) {
      return query;
    }
  }

  return title; // Fallback to the raw title if no match is found
}

// Fetch an image URL from Unsplash based on a query
async function fetchImageUrl(query) {
  try {
    const accessKey = process.env.YOUR_UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      throw new Error("Unsplash Access Key is missing in environment variables.");
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
        query
      )}&client_id=${accessKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching image from Unsplash: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.full; // Use the full-size image URL
    } else {
      console.warn(`No results found for query "${query}"`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching image for query "${query}":`, error);
    return null;
  }
}

// Download an image and save it to the public/images folder
async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filepath = path.join(publicImagesDirectory, filename);
    fs.writeFileSync(filepath, buffer); // Save the image as a file
    console.log(`Image saved: ${filepath}`);
  } catch (error) {
    console.error(`Error saving image "${filename}":`, error);
  }
}

// Main function to process all blog posts
async function processBlogPosts() {
  if (!fs.existsSync(publicImagesDirectory)) {
    fs.mkdirSync(publicImagesDirectory, { recursive: true });
    console.log(`Created directory: ${publicImagesDirectory}`);
  }

  const fileNames = fs.readdirSync(postsDirectory);

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    if (data.title) {
      const query = queryMapping(data.title); // Map title to a specific query
      const imageUrl = await fetchImageUrl(query);
      if (imageUrl) {
        const sanitizedTitle = slug.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        const imageFilename = `${sanitizedTitle}.jpg`;
        await downloadImage(imageUrl, imageFilename);
        console.log(`Image downloaded for post: "${data.title}"`);
      } else {
        console.log(`No image found for post: "${data.title}"`);
      }
    } else {
      console.log(`No title found in post: "${fileName}"`);
    }
  }
}

// Execute the script
processBlogPosts().catch((err) => {
  console.error("Error processing blog posts:", err);
});
