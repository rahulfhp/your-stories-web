"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogData, BlogSection } from "@/lib/website-blogs";
import { PopularPosts } from "@/components/PopularBlogs";
import { createSlugFromTitle, extractBlogIdFromSlug } from "@/lib/utils";

/* Section Renderer Component */
interface SectionRendererProps {
  section: BlogSection;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  switch (section.type) {
    case "text":
      return (
        <p className="text-gray-700 text-base leading-relaxed mb-6 whitespace-pre-line font-montserrat">
          {section.content}
        </p>
      );

    case "heading":
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8 mb-4 font-montserrat">
          {section.content}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 font-montserrat">
          {section.content}
        </h3>
      );

    case "quote":
      return (
        <div className="border-l-4 border-[#21ABE1] bg-gray-50 p-6 my-8 italic">
          <p className="text-gray-700 text-base font-semibold text-center leading-relaxed font-montserrat">
            {section.content}
          </p>
        </div>
      );

    case "image":
      return (
        <div className="my-8">
          <img
            src={section.src}
            alt="images"
            className="w-full h-auto rounded-lg shadow-md"
          />
          {section.caption && (
            <p className="text-sm text-gray-500 text-center mt-2 font-montserrat">
              {section.caption}
            </p>
          )}
        </div>
      );

    case "list":
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {section.items?.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-700 text-base font-semibold font-montserrat"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
};

// Find blog by matching slug
function findBlogBySlug(slug: string) {
  // First, try to extract ID from the end of slug
  const id = extractBlogIdFromSlug(slug);

  // Check if this ID exists in blogData
  if (blogData[id]) {
    return { id: id, blog: blogData[id] };
  }

  // Fallback: search by matching the clean slug (without SEO keywords and ID)
  // This handles old URLs or direct slug matches
  const blogEntries = Object.entries(blogData);
  for (const [blogId, blogContent] of blogEntries) {
    const blogSlug = createSlugFromTitle(blogContent.title);

    // Check if slug contains the blog's clean slug
    if (slug.includes(blogSlug)) {
      return { id: Number(blogId), blog: blogContent };
    }
  }

  return null;
}

/* Main Blog Detail Component */
export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id as string;

  const blogMatch = findBlogBySlug(slug);
  const blog = blogMatch?.blog;
  const blogId = blogMatch?.id;

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name: string): string => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const last =
      parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : "";
    return `${first}${last}`;
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl text-black font-semibold mb-2">
            Blog not found
          </h2>
          <p className="text-gray-600">We couldn't find a blog page.</p>
          <div className="mt-6">
            <button
              onClick={() => router.back()}
              className="px-5 py-2 bg-[#21ABE1] text-white cursor-pointer rounded hover:bg-[#1a8bb8] font-montserrat"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Blog Header */}
      <div className="max-w-4xl mx-auto px-4 pt-20 md:pt-32 pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-montserrat">
          {blog.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#21ABE1] flex items-center justify-center mr-4">
            <span className="text-white font-semibold text-lg font-montserrat">
              {getInitials(blog.author)}
            </span>
          </div>
          <div>
            <p className="text-base text-gray-800 font-medium font-montserrat">
              {blog.author}
            </p>
            <p className="text-sm text-gray-500 font-montserrat">{blog.date}</p>
          </div>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8">
            <img
              src={blog.image}
              alt="image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        {blog.sections.map((section: any, index: number) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </article>

      {/* Popular Posts Section */}
      <PopularPosts />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+919096126060?text=Hello%20Mindefy%20Team,"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-2 z-50 flex items-center gap-2"
      >
        <span className="hidden md:inline-block bg-white px-4 py-2 rounded shadow-lg text-sm text-[#080a3c] border border-gray-200 font-normal font-montserrat">
          Message us
        </span>
        <img
          src="/yourhour-website-img/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-12 h-12"
        />
      </a>

      {/* Scroll to Top Button */}
      {isSticky && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-white text-[#080a3c] rounded-full shadow-lg flex items-center justify-center hover:bg-[#24abe0] hover:text-white transition-all z-[4] text-4xl"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
}
