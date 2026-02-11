import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import {
  trackWebsiteHandpickedStoryCardClicked,
  trackWebsiteLetsReadClicked,
} from "@/lib/website-analytics";
import { createStorySlug } from "@/lib/utils";
import useStoriesStore from "@/stores/stories";
import WebsiteStoryCard from "@/components/WebsiteStoryCard";
import { useEffect } from "react";

export default function Stories() {
  const { handpickedStories, fetchHandpickedStories } = useStoriesStore();

  useEffect(() => {
    fetchHandpickedStories();
  }, [fetchHandpickedStories]);

  const handleStoryClick = (storyId, storyTitle) => {
    trackWebsiteHandpickedStoryCardClicked(storyId, storyTitle);
    const slug = createStorySlug(storyTitle, storyId);
    window.open(`https://stories.yourhourapp.com/screentime/${slug}`, "_blank");
  };

  return (
    <section id="stories" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Inspiration"
          title="Where Stories Find You"
          subtitle="Join thousands of users who have transformed their digital habits with Your Hour by Mindefy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {handpickedStories.slice(0, 3).map((story) => (
            <RevealOnScroll key={story._id}>
              <WebsiteStoryCard
                storyData={story}
                onClick={() => handleStoryClick(story._id, story.storyTitle)}
              />
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://stories.yourhourapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center font-semibold font-montserrat text-lg text-[#21ABE1] border border-[#21ABE1] px-8 py-3 rounded-xl hover:bg-[#21ABE1]/10 hover:scale-105 transition-all inline-block"
            onClick={() => trackWebsiteLetsReadClicked()}
          >
            Let's Read
          </a>
        </div>
      </div>
    </section>
  );
}
