import { popularPosts, blogData } from "@/lib/website-blogs";
import { useRouter } from "next/navigation";
import { trackWebsiteBlogCardClicked } from "@/lib/website-analytics";
import { createBlogSlug } from "@/lib/utils";

/*    Popular Blogs Component it is used on the website blog detail page */
export const PopularPosts: React.FC = () => {
  const router = useRouter();

  const handlePostClick = (id: number) => {
    const post = popularPosts.find((p) => p.id === id);
    if (post) {
      trackWebsiteBlogCardClicked(post.id, post.title, "popular");
    }

    // Get the actual blog from blogData using the ID
    const actualBlog = blogData[id];
    if (actualBlog) {
      const slug = createBlogSlug(actualBlog.title, id);
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-montserrat">
        Popular Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt="image"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-500 mb-2 font-montserrat">
                {post.date}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-[#21ABE1] transition-colors font-montserrat">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
