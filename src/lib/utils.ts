import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// List of keywords to remove from story titles
const REMOVE_KEYWORDS = ['a', 'for', 'in', 'the', 'to', 'and', 'or', 'of', 'with', 'at', 'from', 'by', 'on', 'an'];

// List of SEO keywords to add randomly
const SEO_KEYWORDS = [
  "yourhour-screentime-app",
  "screen-time-tracker",
  "phone-timer-lock-app",
  "mobile-addiction-control-app",
  "phone-addiction-controller",
  "screentime-for-kids",
  "screen-time-control",
  "screen-time-app",
  "screen-time-app-usage-tracker",
  "screen-time-helper",
  "screen-time-parental-control",
];

// Create slug from title for blogs title comparison

// Deterministic keyword selection based on blog ID
function getDeterministicBlogSEOKeywords(id: number): string[] {
  const index1 = id % SEO_KEYWORDS.length;
  const index2 = (id * 2) % SEO_KEYWORDS.length;

  const finalIndex2 = index1 === index2 ? (index2 + 1) % SEO_KEYWORDS.length : index2;

  return [SEO_KEYWORDS[index1], SEO_KEYWORDS[finalIndex2]];
}

// Updated function to create SEO-friendly blog slug
export function createBlogSlug(title: string, id: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim();

  const words = slug.split(/\s+/);
  const filteredWords = words.filter(
    word => !REMOVE_KEYWORDS.includes(word.toLowerCase())
  );

  const cleanSlug = filteredWords
    .join("-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Get deterministic SEO keywords
  const seoKeywords = getDeterministicBlogSEOKeywords(id);

  return `${seoKeywords[0]}-${seoKeywords[1]}-${cleanSlug}-${id}`;
}

// Create slug from title for comparison (without SEO keywords and ID)
export function createSlugFromTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim();

  const words = slug.split(/\s+/);
  const filteredWords = words.filter(
    word => !REMOVE_KEYWORDS.includes(word.toLowerCase())
  );

  return filteredWords
    .join("-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Extract blog ID from slug
export function extractBlogIdFromSlug(slug: string): number {
  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  return Number(id);
}

// function used to create Story Slug and url with story title

// Function to get 2 random SEO keywords
export function getRandomSEOKeywords(): string[] {
  const shuffled = [...SEO_KEYWORDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

// Function to create SEO-friendly slug
export function createStorySlug(title: string, id: string): string {
  // Remove special characters and convert to lowercase
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim();

  // Split into words
  const words = slug.split(/\s+/);

  // Filter out keywords to remove (case-insensitive)
  const filteredWords = words.filter(
    word => !REMOVE_KEYWORDS.includes(word.toLowerCase())
  );

  // Join filtered words with hyphens
  const cleanSlug = filteredWords
    .join("-")
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

  // Get 2 random SEO keywords
  const randomKeywords = getRandomSEOKeywords();

  // Combine: randomkey1-randomkey2-cleaned-title-id
  return `${randomKeywords[0]}-${randomKeywords[1]}-${cleanSlug}-${id}`;
}

// Function to extract ID from SEO-friendly slug
export function extractIdFromSlug(slug: string): string {
  // Extract the last segment after the final hyphen (the ID)
  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  return id;
}