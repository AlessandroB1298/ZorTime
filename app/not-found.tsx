// app/not-found.js or app/not-found.tsx
import { ArrowBigLeft, ArrowBigRight, MoveRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-8xl font-extrabold ">404</h1>
      <p>Looks like you have strayed away from the path...</p>
      <div className="flex flex-row items-center gap-3">
        <h2 className="text-3xl">Return Home</h2>
        <Link href={"/"}>
          <MoveRight size={100} />
        </Link>
      </div>
    </div>
  );
}
