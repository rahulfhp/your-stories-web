'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ReadStoryPage from '@/components/ReadStoryPage';

interface PageProps {
  params: {
    storyId: string;
  };
}

const ReadStoryPageRoute: React.FC<PageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const sourceType = searchParams.get('from') as 'handpicked' | 'more-stories' | 'search' | 'bookmarked' || 'handpicked';

  return (
    <ReadStoryPage 
      storyId={params.storyId} 
      sourceType={sourceType}
    />
  );
};

export default ReadStoryPageRoute;