import Lottie from "lottie-react";
import timeSands from "@/app/assets/Sandy Loading.json";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
export default function ComingSoon() {
  const lottieAnimationref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      yoyo: true,
      repeat: -1,
      ease: "none",
    });
    const splitText = SplitText.create(textRef.current);

    tl.fromTo(
      lottieAnimationref.current,
      { y: 100, opacity: 0 }, // GSAP will override the initial opacity:0 from gsap.set
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        visibility: "visible", // Make visible during animation
      },
    ).fromTo(
      splitText.chars,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: "elastic",
        visibility: "visible",
      },
    );
  }, []);
  return (
    <div>
      <div ref={lottieAnimationref}>
        <Lottie className="h-96" animationData={timeSands}></Lottie>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center">
          <h3 ref={textRef} className="text-5xl font-semibold text-foreground">
            Coming Soon
          </h3>
        </div>
      </div>
    </div>
  );
}
