import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { productItems } from "@/lib/constants/products";
import ProductCard from "./productCard";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function ProductCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative z-10 px-4 py-12 md:py-16 bg-card/40 backdrop-blur"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            <span className="text-primary">Featured</span> Products
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed"
          >
            A list of the unique and one of a kind features we offer
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {productItems.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <ProductCard
                  productTitle={product.productTitle}
                  productDesc={product.productDesc}
                  productIcon={product.productIcon}
                  productImage={product.productImage}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
