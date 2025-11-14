"use client";

import { useEffect, useState } from "react";

const blogs = [
  {
    id: 1,
    category: "2020",
    link: "#",
    image: "yourhour-website-img/yourhourapp_Letter-To-Device_gap.jpg",
    author: "Wesley D'Souza",
    title: "A Letter To My Smartphone!",
    date: "Mar 14, 2020",
  },
  {
    id: 2,
    category: "2020",
    link: "#",
    image:
      "yourhour-website-img/yourhourapp_Girl-using-charging-smartphone_gap.jpg",
    author: "Wesley D'Souza",
    title: "Phone Addiction",
    date: "April 16, 2020",
  },
  {
    id: 3,
    category: "2020",
    link: "#",
    image: "yourhour-website-img/yourhourapp_Humanity_gap.jpg",
    author: "Wesley D'Souza",
    title: "The Great Covid Realisation",
    date: "May 18, 2020",
  },
  {
    id: 4,
    category: "2020",
    link: "#",
    image: "yourhour-website-img/yourhourapp_meditation_gap.jpg",
    author: "Wesley D'Souza",
    title: "Mindfulness and Productivity",
    date: "June 21, 2020",
  },
  {
    id: 5,
    category: "2020",
    link: "#",
    image: "yourhour-website-img/yourhourapp_Nickel-Boys_gap.jpg",
    author: "Wesley D'Souza",
    title:
      "A Review of Colson Whitehead's Pulitzer Prize-winning novel 'Nickel Boys'",
    date: "July 01, 2020",
  },
  {
    id: 6,
    category: "2019",
    link: "#",
    image: "yourhour-website-img/yourhourapp_looking-for-solution_gap.jpg",
    author: "Daksh Haldar",
    title: "Procrastination and Ways to Overcome It",
    date: "June 30, 2019",
  },
  {
    id: 7,
    category: "2019",
    link: "#",
    image: "yourhour-website-img/yourhourapp_To-Do-List_gap.jpg",
    author: "Daksh Haldar",
    title: "Three Ways to Manage Your Time",
    date: "May 14, 2019",
  },
  {
    id: 8,
    category: "2019",
    link: "#",
    image: "yourhour-website-img/yourhourapp_work-from-home-and-office_gap.jpg",
    author: "Daksh Haldar",
    title: "The Office Away From Office",
    date: "June 16, 2019",
  },
  {
    id: 9,
    category: "2019",
    link: "#",
    image: "yourhour-website-img/Youhour_app_Top.jpg",
    author: "Daksh Haldar",
    title: 'The Difference between "AVERAGE AND SUCCESS"',
    date: "July 16, 2019",
  },
  {
    id: 10,
    category: "2018",
    link: "#",
    image: "yourhour-website-img/yourhourapp_relationship_gap5_3.jpg",
    author: "Jamila Johar",
    title: '"YOUNG V/S THE OLD!" Smart Phones Seperating Generations!',
    date: "March 16, 2018",
  },
  {
    id: 11,
    category: "2018",
    link: "#",
    image: "yourhour-website-img/YourHour_app_NewDrug.jpg",
    author: "Jamila Johar",
    title: '"MOBILE ADDICTION" The Show Behind!',
    date: "April 16, 2018",
  },
];

export default function BlogsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="relative w-full overflow-hidden bg-white pt-[12%] md:pt-[8%] lg:pt-[4%]">
        {/* SKY BACKGROUND IMAGE */}
        <div
          className="w-full bg-no-repeat bg-cover bg-top pt-16 pb-[10%]"
          style={{
            backgroundImage: "url('/yourhour-website-img/BlogTopBgImage.svg')",
            backgroundSize: "100% auto",
          }}
        >
          <div className="max-w-5xl mx-auto px-4">
            {/* LEFT TEXT */}
            <div className="max-w-lg">
              <span className="block text-2xl md:text-3xl text-black font-normal font-montserrat mt-1">
                Read
              </span>
              <span className="block text-2xl md:text-3xl font-semibold font-montserrat text-[#21ABE1] tracking-widest mt-1">
                Real Experiences
              </span>
              <span className="block text-2xl md:text-3xl text-black font-normal font-montserrat mt-1">
                & Stories from
              </span>
              <span className="block text-2xl md:text-3xl font-semibold font-montserrat text-[#21ABE1] tracking-widest mt-1">
                Mental Health Experts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* blog Title */}
      <div className="container mx-auto px-4 text-center">
        <span className="text-4xl text-black font-semibold font-montserrat leading-normal">
          Blogs
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <div className="flex justify-center gap-4 flex-wrap">
          {["all", "2020", "2019", "2018"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 font-semibold text-sm font-montserrat text-[#21ABE1] transition-all ${
                activeFilter === filter
                  ? "border-b-2 border-[#21ABE1]"
                  : "cursor-pointer hover:border-b-2"
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
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="mb-4">
                <a href={blog.link}>
                  <div className="bg-white h-[26rem] rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-2">
                    <div className="overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-60 object-cover transition-transform hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        {/* Avatar Circle */}
                        <div className="w-10 h-10 rounded-full bg-[#21ABE1] flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-base">
                            {getInitials(blog.author)}
                          </span>
                        </div>

                        {/* Author Name */}
                        <p className="text-sm text-gray-700 font-medium font-montserrat">
                          {blog.author}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-[#4a6f8a] mb-2 line-clamp-2 font-montserrat">
                        {blog.title}
                      </p>
                      <p className="text-sm text-gray-500 font-montserrat">
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
        <span className="hidden md:inline-block bg-white px-4 py-2 rounded shadow-lg text-sm text-[#080a3c] border border-gray-200 font-normal font-montserrat">
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
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-white text-[#080a3c] rounded-full shadow-lg flex items-center justify-center hover:bg-[#24abe0] hover:text-white transition-all z-[4] text-4xl"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
}
