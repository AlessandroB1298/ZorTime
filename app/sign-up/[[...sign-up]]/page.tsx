import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard" // Add this as well
        fallbackRedirectUrl="/"
      />
    </div>
  );
}
