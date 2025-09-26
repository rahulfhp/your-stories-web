'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ReadStoryPage from '@/components/ReadStoryPage';

interface PageProps {
  params: Promise<{
    storyId: string;
  }>;
}

const ReadStoryPageRoute: React.FC<PageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const searchParams = useSearchParams();
  const sourceType = searchParams.get('source') as 'handpicked' | 'more-stories' | 'search' | 'bookmarked' | 'profile' || 'handpicked';

  return (
    <ReadStoryPage 
      storyId={resolvedParams.storyId} 
      sourceType={sourceType}
    />
  );
};

export default ReadStoryPageRoute;