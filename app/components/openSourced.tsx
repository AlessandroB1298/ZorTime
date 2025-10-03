"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Heart, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function OpenSource() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Card
          ref={cardRef}
          className="border-[#c44900] bg-[#432534] shadow-2xl"
        >
          <CardContent className="p-12">
            <div className="text-center">
              <Code2 className="mx-auto h-16 w-16 text-[#c44900]" />
              <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-[#efd6ac] sm:text-5xl">
                Free & Open Source
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#efd6ac]/80">
                Built by the community, for the community. Transparent,
                customizable, and always free. Contribute, fork, or use it as
                you wish.
              </p>
              <Button
                size="lg"
                className="mt-8 bg-[#c44900] text-[#efd6ac] hover:bg-[#c44900]/90"
              >
                Star on GitHub
              </Button>
            </div>

            <div ref={statsRef} className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <Users className="mx-auto h-10 w-10 text-[#c44900]" />
                <p className="mt-4 text-3xl font-bold text-[#efd6ac]">10K+</p>
                <p className="mt-2 text-[#efd6ac]/70">Active Users</p>
              </div>
              <div className="text-center">
                <Heart className="mx-auto h-10 w-10 text-[#c44900]" />
                <p className="mt-4 text-3xl font-bold text-[#efd6ac]">2.5K+</p>
                <p className="mt-2 text-[#efd6ac]/70">GitHub Stars</p>
              </div>
              <div className="text-center">
                <Code2 className="mx-auto h-10 w-10 text-[#c44900]" />
                <p className="mt-4 text-3xl font-bold text-[#efd6ac]">100%</p>
                <p className="mt-2 text-[#efd6ac]/70">Open Source</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
