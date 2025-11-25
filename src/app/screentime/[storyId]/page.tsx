"use client";

import React from "react";
import ReadStoryPage from "@/components/ReadStoryPage";

interface PageProps {
  params: Promise<{
    storyId: string;
  }>;
}

const ReadStoryPageRoute: React.FC<PageProps> = ({ params }) => {
  const resolvedParams = React.use(params);

  return <ReadStoryPage storyId={resolvedParams.storyId} />;
};

export default ReadStoryPageRoute;
