import mixpanel from '@/config/mixpanelConfig';
import { Story } from '@/stores/stories';

// User properties type
interface UserProperties {
  userId?: string;
  email?: string;
  name?: string;
}

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Identify user
export const identifyUser = (userProperties: UserProperties) => {
  if (!isBrowser) return;
  
  try {
    if (userProperties.userId) {
      mixpanel.identify(userProperties.userId);
      
      // Set user properties
      mixpanel.people.set({
        $email: userProperties.email,
        $name: userProperties.name,
      });
    }
  } catch (error) {
    console.error('Mixpanel identify error:', error);
  }
};

// Reset user (on logout)
export const resetUser = () => {
  if (!isBrowser) return;
  
  try {
    mixpanel.reset();
  } catch (error) {
    console.error('Mixpanel reset error:', error);
  }
};

// READING BEHAVIOR EVENTS

// Track when a user views a story
export const trackStoryViewed = (story: Story) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('story_viewed', {
      story_id: story._id,
      category: story.tagList?.join(', ') || '',
      author: story.userName,
      read_time_estimate: estimateReadTime(story.storyContent),
      story_title: story.storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track story read progress
export const trackReadProgress = (story: Story, percentage: 25 | 50 | 75 | 100) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('story_read_progress', {
      story_id: story._id,
      percentage,
      story_title: story.storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track time spent reading
export const trackTimeSpentReading = (story: Story, seconds: number) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('time_spent_reading', {
      story_id: story._id,
      seconds,
      story_title: story.storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// ENGAGEMENT EVENTS

// Track story upvoted
export const trackStoryUpvoted = (storyId: string, storyTitle: string) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('story_upvoted', {
      story_id: storyId,
      story_title: storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track story upvote removed
export const trackStoryUpvoteRemoved = (storyId: string, storyTitle: string) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('story_upvote_removed', {
      story_id: storyId,
      story_title: storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track story bookmarked
export const trackStoryBookmarked = (storyId: string, storyTitle: string) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('story_bookmarked', {
      story_id: storyId,
      story_title: storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track story bookmark removed
export const trackStoryBookmarkRemoved = (storyId: string, storyTitle: string) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('story_bookmark_removed', {
      story_id: storyId,
      story_title: storyTitle,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// DISCOVERY EVENTS

// Track search performed
export const trackSearchPerformed = (query: string, resultCount: number) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('search_performed', {
      query,
      result_count: resultCount,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track category clicked
export const trackCategoryClicked = (category: string) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('category_clicked', {
      category,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// USER JOURNEY EVENTS

// Track user logged in
export const trackUserLoggedIn = (provider: string) => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('user_logged_in', {
      provider,
    });
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track homepage visited
export const trackHomepageVisited = () => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('homepage_visited');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Track profile visited
export const trackProfileVisited = () => {
  if (!isBrowser) return;
  
  try {
    mixpanel.track('profile_visited');
  } catch (error) {
    console.error('Mixpanel track error:', error);
  }
};

// Helper function to estimate read time based on content length
const estimateReadTime = (content: string): number => {
  if (!content) return 0;
  
  // Average reading speed: 200 words per minute
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  
  return minutes;
};