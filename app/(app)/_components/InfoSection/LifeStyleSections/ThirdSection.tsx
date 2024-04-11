import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

type ThirdSectionProps = {
  scrollTween: gsap.core.Tween;
};

const ThirdSection = ({ scrollTween }: ThirdSectionProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!scrollTween) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "left center",
            end: "left top",
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .to("#Music", {
          opacity: 0,
        })
        .to(
          "#ScrollerContainer",
          {
            // backgroundColor: "#d0d0c9",
          },
          "<",
        );

      const canvas = document.querySelector("#Canvas")!;
    },
    { dependencies: [scrollTween] },
  );

  return (
    <>
      <div
        ref={container}
        className="flex h-screen w-full flex-col items-center justify-center text-white"
      >
        <h1>Tech Stack</h1>
      </div>
    </>
  );
};

export default ThirdSection;
