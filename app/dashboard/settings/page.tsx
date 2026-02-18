"use client";
import { useUser } from "@clerk/clerk-react";

export default function Page() {
  const { user, isLoaded } = useUser();

  return (
    <div>
      <div className="m-2">
        <div>
          {isLoaded && user && (
            <div>
              <h1 className="mb-2 text-2xl font-semibold">
                {user.firstName}
                {"'s"} Settings{""}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
