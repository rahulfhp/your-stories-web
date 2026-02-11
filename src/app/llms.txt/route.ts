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
    content = `# YourHour App

> YourHour is a screen time management and digital wellbeing app that helps users track usage, set limits, and build healthier digital habits.

This file provides a concise map of the most important pages and resources for the YourHour website.

## Key Pages
- [Home](https://www.yourhourapp.com/): Overview of the app and its core benefits.
- [Blogs](https://www.yourhourapp.com/blogs): Expert insights on screen time, mindfulness, and productivity.
- [FAQs](https://www.yourhourapp.com/faqs): Common questions and answers.
- [Privacy Policy](https://www.yourhourapp.com/privacy-policy): Privacy and data handling details.

## App & Company
- [Google Play](https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US): Android app listing.
- [YourStories](https://stories.yourhourapp.com/): Community stories and recovery journeys.
- [Mindefy Technologies](https://mindefy.tech/): Company site.

## Optional
- [Sitemap](https://www.yourhourapp.com/sitemap.xml): Full list of indexable pages.
`;
  } else {
    // Stories Webapp
    content = `# YourStories

> YourStories is a platform for sharing and reading authentic screen time recovery stories and digital detox experiences.

This file provides a concise map of the most important pages and resources for the YourStories webapp.

## Key Pages
- [Home](https://stories.yourhourapp.com/): Recent and featured stories.
- [Search](https://stories.yourhourapp.com/search): Find stories by title or tags.
- [Write](https://stories.yourhourapp.com/write): Share a recovery story.
- [Profile](https://stories.yourhourapp.com/profile): Manage your stories and account.

## App & Company
- [YourHour](https://www.yourhourapp.com/): Main app website.
- [Google Play](https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US): Android app listing.
- [Mindefy Technologies](https://mindefy.tech/): Company site.

## Optional
- [Sitemap](https://stories.yourhourapp.com/sitemap.xml): Full list of indexable pages.
`;
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
