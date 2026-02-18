"use client";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={"text-2xl font-extrabold "}>
            {user.firstName}
            {"'s"} Dashboard
          </h1>
        </div>
        <div className="mt-6"></div>
      </div>
    </div>
  );
}
