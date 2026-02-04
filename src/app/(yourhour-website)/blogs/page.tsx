"use client";

import { blogs } from "@/lib/website-blogs";
import { useEffect, useState } from "react";
import {
  trackWebsiteBlogsPageVisited,
  trackWebsiteBlogCardClicked,
} from "@/lib/website-analytics";
import { createBlogSlug } from "@/lib/utils";

export default function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 400);
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track blogs page visit event on mount
  useEffect(() => {
    trackWebsiteBlogsPageVisited();
  }, []);

  function getInitials(name: string) {
    if (!name) return "";

    const parts = name.trim().split(" ").filter(Boolean);

    const first = parts[0]?.charAt(0).toUpperCase();
    const last =
      parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : "";

    return first + last;
  }

  const filteredBlogs =
    activeFilter === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === activeFilter);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Header Section */}
      <div className="relative w-full overflow-hidden bg-slate-950 pt-[12%] md:pt-[8%] lg:pt-[4%]">
        {/* SKY BACKGROUND IMAGE - Using a dark overlay or just the image if it works */}
        <div
          className="w-full bg-no-repeat bg-cover bg-top pt-16 pb-[10%]"
          style={{
            backgroundImage: "url('/yourhour-website-img/BlogTopBgImage.svg')",
            backgroundSize: "100% auto",
          }}
        >
          {/* Overlay for better text readability on dark theme if needed, but let's keep it simple first */}
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            {/* LEFT TEXT */}
            <div className="max-w-lg">
              <span className="block text-2xl md:text-3xl text-white font-normal font-montserrat mt-1">
                Read
              </span>
              <span className="block text-2xl md:text-3xl font-semibold font-montserrat text-[#4DD0E1] tracking-widest mt-1">
                Real Experiences
              </span>
              <span className="block text-2xl md:text-3xl text-white font-normal font-montserrat mt-1">
                & Stories from
              </span>
              <span className="block text-2xl md:text-3xl font-semibold font-montserrat text-[#4DD0E1] tracking-widest mt-1">
                Mental Health Experts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* blog Title */}
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl text-white font-semibold font-montserrat leading-normal">
          Blogs
        </h1>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 py-4 bg-slate-950">
        <div className="flex justify-center gap-4 flex-wrap">
          {["all", "2020", "2019", "2018"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-semibold text-sm font-montserrat text-[#4DD0E1] transition-all ${
                activeFilter === filter
                  ? "border-b-2 border-[#4DD0E1]"
                  : "cursor-pointer hover:border-b-2 hover:border-[#4DD0E1]/50"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? [...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 h-[26rem] rounded-lg shadow-lg overflow-hidden animate-pulse border border-slate-800"
                  >
                    <div className="h-60 bg-slate-800"></div>

                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 mr-3"></div>
                        <div className="w-32 h-4 bg-slate-800 rounded"></div>
                      </div>

                      <div className="h-5 bg-slate-800 rounded w-3/4 mb-3"></div>
                      <div className="h-5 bg-slate-700 rounded w-2/4 mb-3"></div>

                      <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                    </div>
                  </div>
                ))
              : filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="mb-4 transition-opacity duration-300 opacity-100"
                  >
                    <a
                      href={`/blog/${createBlogSlug(blog.title, blog.id)}`}
                      onClick={() =>
                        trackWebsiteBlogCardClicked(
                          blog.id,
                          blog.title,
                          "normal"
                        )
                      }
                    >
                      <div className="bg-slate-900 h-[26rem] rounded-lg shadow-lg shadow-black/20 border border-slate-800 overflow-hidden transition-transform hover:-translate-y-2 hover:border-[#00BCD4]/30">
                        <div className="overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-60 object-cover transition-transform hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center mr-3 text-white">
                              <span className="font-semibold text-base">
                                {getInitials(blog.author)}
                              </span>
                            </div>
                            {/* Author Name */}
                            <p className="text-sm text-slate-300 font-medium font-montserrat">
                              {blog.author}
                            </p>
                          </div>
                          <p className="text-lg font-semibold text-[#4DD0E1] mb-2 line-clamp-2 font-montserrat group-hover:text-white">
                            {blog.title}
                          </p>
                          <p className="text-sm text-slate-500 font-montserrat">
                            {blog.date}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+919096126060?text= Hello Mindefy Team,"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-2 z-50 flex items-center gap-2"
      >
        <span className="hidden md:inline-block bg-slate-900 px-4 py-2 rounded shadow-lg text-white text-sm border border-slate-700 font-normal font-montserrat">
          Message us
        </span>
        <img
          src="yourhour-website-img/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-12 h-12"
        />
      </a>

      {/* Scroll to Top Button */}
      {isSticky && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00BCD4] transition-all z-[4] text-4xl border border-slate-700"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
}
