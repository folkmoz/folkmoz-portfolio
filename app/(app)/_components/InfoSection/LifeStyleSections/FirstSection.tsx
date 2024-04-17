import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

type FirstSectionProps = {
  setPinned: (value: boolean) => void;
  scrollTween: gsap.core.Tween;
};

const FirstSection = ({ setPinned, scrollTween }: FirstSectionProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const title = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!scrollTween) return;
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.innerWidth < 480;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 40%",
          end: "95% bottom",
          scrub: 1,
        },
      });

      tl.from(title.current, {
        y: -200,
        opacity: 0,
        scale: 3,
        duration: 1,
      })
        .to(title.current!.querySelector("h3 > span"), {
          // color: "#ac6a6a",
        })
        .to(title.current?.querySelectorAll("i")!, {
          color: "#ff7200",
        });

      gsap.to(container.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        onComplete: () => setPinned(true),
        onReverseComplete: () => setPinned(false),
      });

      const canvas = document.querySelector("#Canvas");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .to(title.current?.querySelector("h3")!, {
          xPercent: -65,
        })
        .to(
          canvas,
          {
            zIndex: 0,
          },
          isMobile ? "-=1" : "-=0.4",
        );
    },
    { scope: container, dependencies: [scrollTween] },
  );

  return (
    <>
      <div
        ref={container}
        className="relative flex h-screen w-full min-w-[100vw] items-center justify-center will-change-transform"
        id="LifeStyle"
      >
        <div className="relative z-5 text-5xl font-bold leading-[1.5] text-white sm:text-7xl md:text-8xl xl:text-9xl">
          <div ref={title}>
            <h3>
              <span>Know me</span> <i>better</i>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstSection;
