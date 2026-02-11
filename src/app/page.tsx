"use client";

import { useEffect, useState } from "react";
import { getDomainType } from "@/lib/domainUtils";
import WebsiteHomePage from "@/components/WebsiteHomePage";
import StoriesHomePage from "@/components/StoriesHomePage";

export default function Home() {
  const [domainType, setDomainType] = useState<"app" | "website" | "localhost">(
    "localhost"
  );

  const [isClient, setIsClient] = useState(false);

  // Detect domain and mark client-side
  useEffect(() => {
    setIsClient(true);
    setDomainType(getDomainType());
  }, []);

  // Conditional render for yourhour website and stories webapp landing page.
  return (
    <>
      {isClient && domainType === "website" ? (
        <WebsiteHomePage />
      ) : (
        <StoriesHomePage />
      )}
    </>
  );
}
