"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const InfoSection = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const containerWidth =
        scrollContainer.current!.offsetWidth -
        document.documentElement.clientWidth;

      gsap.to(scrollContainer.current, {
        x: () => -containerWidth,
        ease: "none",

        scrollTrigger: {
          trigger: scrollContainer.current,
          start: "top top",
          end: () => `+=${containerWidth}`,
          scrub: 0.5,
          pin: true,
          markers: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <>
      <div className={"h-screen bg-yellow-200"}>
        <h1>Hello</h1>
      </div>
      <div className={"relative"}>
        <div ref={container}>
          <section
            ref={scrollContainer}
            className="flex h-screen w-[400%] flex-nowrap "
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative flex h-full w-full items-center justify-center will-change-transform"
              >
                {index + 1}
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className={"h-screen bg-yellow-200"}>
        <h1> world</h1>
      </div>
    </>
  );
};

export default InfoSection;
