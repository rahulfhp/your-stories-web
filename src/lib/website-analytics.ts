import mixpanel from '@/config/mixpanelConfig';

const isBrowser = typeof window !== 'undefined';

// Header events
export const trackWebsiteHeaderStoriesLogoClicked = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_header_stories_logo_clicked');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Home page events
export const trackWebsiteHomepageVisited = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_homepage_visited');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteGooglePlayClicked = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_google_play_button_clicked');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteBottomStoriesLogoClicked = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_bottom_stories_logo_clicked');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteHandpickedStoryCardClicked = (storyId: string | number, storyTitle: string) => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_handpicked_story_card_clicked', {
      story_id: String(storyId),
      story_title: storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteLetsReadClicked = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_lets_read_button_clicked');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Blogs page events
export const trackWebsiteBlogsPageVisited = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_blogs_page_visited');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteBlogCardClicked = (
  blogId: string | number,
  blogTitle: string,
  source: 'normal' | 'popular'
) => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_blog_card_clicked', {
      blog_id: String(blogId),
      blog_title: blogTitle,
      source,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// MindfulNest Chatbot events
export const trackWebsiteChatbotOpened = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_mindfulNest_chatbot_opened');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteChatbotClosed = () => {
  if (!isBrowser) return;
  try {
    mixpanel.track('website_mindfulNest_chatbot_closed');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteChatbotQuerySubmitted = (query: string) => {
  if (!isBrowser) return;
  try {
    const trimmed = query.slice(0, 150);
    mixpanel.track('website_mindfulNest_chatbot_user_query_submitted', {
      query: trimmed,
      original_length: query.length,
      captured_length: trimmed.length,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

export const trackWebsiteChatbotTokensUsed = (tokensUsed: number, query: string) => {
  if (!isBrowser) return;
  try {
    const trimmedQuery = query.slice(0, 150);
    mixpanel.track('website_mindfulNest_chatbot_tokens_used', {
      tokens_used: tokensUsed,
      query: trimmedQuery,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};