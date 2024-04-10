import { Fragment, ReactFragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type AnimatedTextProps = {
  words: string[];
  delay?: number;
  duration?: number;
  ease?: string;
  animate?: boolean;
};

const AnimatedText = ({
  words,
  delay,
  duration,
  ease,
  animate = true,
}: AnimatedTextProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      gsap.set(".inline-block", { opacity: 0 });
      if (!animate) return;

      gsap.to(".inline-block", {
        opacity: 1,
      });

      const wordBlock = gsap.utils.toArray(".inline-block");
      wordBlock.forEach((block) => {
        const letters = (block as HTMLElement).querySelectorAll(".letter");
        gsap.from(letters, {
          y: "100%",
          opacity: 0,
          duration: duration || 1,
          stagger: 0.02,
          ease: ease || "back.out(1.4)",
          delay: delay || 0,
        });
      });
    },
    { scope: container, dependencies: [animate] },
  );
  return (
    <div className="relative flex flex-col" ref={container}>
      {words.map((text, index) => {
        return (
          <span className="inline-block" key={index}>
            {text.split("").map((letter, index) => (
              <span
                className="relative inline-flex overflow-hidden"
                key={index + letter}
              >
                <span className="letter">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
};

export default AnimatedText;
