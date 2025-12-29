import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDomainTypeByHost } from '@/lib/domainUtils';

// The llms.txt file serve as a dynamic route based on the platform 

export async function GET() {
  const h = headers();
  const host = (await h).get("x-forwarded-host") || (await h).get("host") || "";
  const domainType = getDomainTypeByHost(host);
  const isWebsite = domainType === "website";

  let content = "";

  if (isWebsite) {
    content = `site: YourHour App

url: https://www.yourhourapp.com

description: YourHour is a screen time management and digital wellbeing app that helps users track usage, set limits, and build healthier digital habits. Developed by Mindefy Technologies.

primary_language: en
region: Global

important_pages:
- https://www.yourhourapp.com/
- https://www.yourhourapp.com/blogs
- https://www.yourhourapp.com/faqs
- https://www.yourhourapp.com/privacy-policy

sitemap: https://www.yourhourapp.com/sitemap.xml

contact:
- https://mindefy.tech/#contact
`;
  } else {
    // Stories Webapp
    content = `site: YourStories

url: https://stories.yourhourapp.com

description: YourStories is a platform for sharing and reading authentic screen time recovery stories, overcoming phone addiction, and digital detox experiences. Developed by Mindefy Technologies.

primary_language: en
region: Global

important_pages:
- https://stories.yourhourapp.com/
- https://stories.yourhourapp.com/search
- https://stories.yourhourapp.com/write
- https://stories.yourhourapp.com/profile

sitemap: https://stories.yourhourapp.com/sitemap.xml

contact:
- https://mindefy.tech/#contact 
`;
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
