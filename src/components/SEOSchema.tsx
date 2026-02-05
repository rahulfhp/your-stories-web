interface StructuredDataSchemaProps {
  isWebsite: boolean;
}

export default function StructuredDataSchema({
  isWebsite,
}: StructuredDataSchemaProps) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YourHour App",
    url: "https://www.yourhourapp.com",
    description:
      "YourHour helps you understand and reduce phone usage with daily limits, detailed reports, and mindful nudges to build healthier digital habits.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.yourhourapp.com/blogs?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US",
      "https://stories.yourhourapp.com/",
      "https://mindefy.tech/",
    ],
  };

  const storiesSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YourStories - YourHour App",
    url: "https://stories.yourhourapp.com",
    description:
      "Discover authentic screen time recovery stories and share your own journey. Read, write, and connect with real experiences from students and youngsters overcoming phone addiction.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://stories.yourhourapp.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US",
      "https://www.yourhourapp.com",
      "https://mindefy.tech/",
    ],
  };

  // Organization Schema (appears on both domains)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mindefy Technologies",
    alternateName: "Mindefy Technologies",
    url: "https://mindefy.tech/",
    logo: "https://mindefy.tech/images/nav-logo.svg",
    sameAs: [
      "https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US",
      "https://mindefy.tech/",
    ],
  };

  // BreadcrumbList Schema for better navigation
  const breadcrumbSchema = isWebsite
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.yourhourapp.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Stories",
            item: "https://stories.yourhourapp.com",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Blogs",
            item: "https://www.yourhourapp.com/blogs",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Mindefy Tech",
            item: "https://mindefy.tech/",
          },
        ],
      }
    : {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "YourHour",
            item: "https://www.yourhourapp.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Stories",
            item: "https://stories.yourhourapp.com",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Blogs",
            item: "https://www.yourhourapp.com/blogs",
          },
        ],
      };

  // Mobile Application Schema for Play Store
  const mobileAppSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "YourHour - Phone Addiction Tracker",
    operatingSystem: "Android",
    applicationCategory: "Productivity Application",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      ratingCount: "77000",
    },
    url: "https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(isWebsite ? websiteSchema : storiesSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mobileAppSchema),
        }}
      />
    </>
  );
}
