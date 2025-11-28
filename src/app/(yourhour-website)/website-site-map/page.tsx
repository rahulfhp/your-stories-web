import Link from "next/link";

const websitePages = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default async function SitemapPage() {
  return (
    <>
      <div className="pt-20 w-full bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Sitemap
            </h1>
            <p className="mt-2 text-gray-600">
              Find and visit all the pages on the YourHour website.
            </p>
          </header>
          <div className="max-w-lg mx-auto grid grid-cols-1 gap-8">
            <section className="bg-white/80 backdrop-blur-xl border border-gray-300/60 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                YourHour
              </h2>
              <ul className="space-y-3">
                {websitePages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="block px-4 py-2 rounded-lg text-gray-800 border border-gray-300/60 bg-gray-100/70 hover:bg-gray-200/80 transition-colors cursor-pointer"
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
