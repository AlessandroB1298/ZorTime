"use client";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";

export default function Hero() {
  const mainTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" },
      onComplete: () => {},
    });

    tl.fromTo(
      mainTextRef.current,
      { y: 50, opacity: 0 }, // GSAP will override the initial opacity:0 from gsap.set
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        visibility: "visible", // Make visible during animation
      }
    )
      .fromTo(
        subTextRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          visibility: "visible",
        },
        ">-0.4"
      )
      .fromTo(
        buttonRef.current!.children,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.1,
          ease: "power2.in",
          visibility: "visible",
        },
        ">-0.3"
      );
  });
  return (
    <main className=" bg-background">
      <Spotlight />
      <section className="pb-42 z-10">
        <div className="container mx-auto max-w-6xl pt-36">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary">
              <Clock className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-semibold text-secondary-foreground">
                Master Your Time
              </span>
            </div>

            <h1
              ref={mainTextRef}
              className="text-5xl z-20 md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl text-foreground"
            >
              Take Control of Your{" "}
              <span className="text-primary">Most Valuable</span> Resource
            </h1>

            <p
              ref={subTextRef}
              className="text-lg z-20 md:text-xl text-foreground/80 max-w-2xl text-pretty leading-relaxed"
            >
              Transform how you manage your time with intelligent tools designed
              to help you focus on what truly matters and achieve your goals
              faster.
            </p>

            <div
              ref={buttonRef}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <Link href={"/sign-up"}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                >
                  Get Started Free
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary/20 bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
