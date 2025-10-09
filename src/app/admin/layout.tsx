"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is an admin based on role
  const isAdmin = currentUser?.userRole === "admin";

  useEffect(() => {
    // Check if user is authenticated and is an admin
    const checkAuth = async () => {
      setIsLoading(true);

      // Wait a bit to ensure auth state is loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    checkAuth();
  }, [currentUser, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-3 px-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Your Stories Admin</h1>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
