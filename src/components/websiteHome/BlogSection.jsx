import { ArrowRight } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { createBlogSlug } from "@/lib/utils";
import { popularPosts, blogData } from "@/lib/website-blogs";
import { useRouter } from "next/navigation";
import { trackWebsiteBlogCardClicked } from "@/lib/website-analytics";

export default function BlogSection() {
  const router = useRouter();

  const handlePostClick = (id) => {
    const post = popularPosts.find((p) => p.id === id);
    if (post) {
      trackWebsiteBlogCardClicked(post.id, post.title, "popular");
    }

    const actualBlog = blogData[id];
    if (actualBlog) {
      const slug = createBlogSlug(actualBlog.title, id);
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Blog"
          title="Insights From Our Experts"
          subtitle="Read popular posts on mindfulness, productivity, and reducing screen time."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPosts.slice(0, 3).map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 100}>
              <div
                onClick={() => handlePostClick(post.id)}
                className="cursor-pointer group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-cyan-900/10"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl min-h-15 font-bold text-white mb-3 group-hover:text-[#00BCD4] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="inline-flex items-center text-sm font-bold text-[#00BCD4] hover:text-[#00B0C0]">
                    Read Article <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
