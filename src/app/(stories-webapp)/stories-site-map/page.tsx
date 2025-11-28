import Link from "next/link";

const appPages = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Write", href: "/write" },
  { label: "Bookmarked", href: "/bookmarked" },
  { label: "Profile", href: "/profile" },
];

export default async function SitemapPage() {
  return (
    <>
      <div className="pt-20 w-full bg-gradient-to-b from-white to-white dark:from-black dark:to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
              Sitemap
            </h1>
            <p className="mt-2 text-gray-600 dark:text-white/70">
              Find and visit all the pages on the Stories web.
            </p>
          </header>
          <div className="max-w-lg mx-auto grid grid-cols-1 gap-8">
            <section className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Stories
              </h2>
              <ul className="space-y-3">
                {appPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="block px-4 py-2 rounded-lg text-gray-800 dark:text-white border border-gray-300/60 dark:border-white/20 bg-gray-100/80 dark:bg-black/25 backdrop-blur-xl hover:bg-gray-200/90 dark:hover:bg-white/10 hover:border-gray-400/60 dark:hover:border-white/30 transition-all duration-300"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
