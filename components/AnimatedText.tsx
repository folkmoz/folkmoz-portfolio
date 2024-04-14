import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AnimatedTextProps = {
  words: string[];
  delay?: number;
  duration?: number;
  ease?: string;
  animate?: boolean;
  inView?: boolean;
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
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(".inline-block", { opacity: 0 });
      if (!animate) return;

      gsap.to(".inline-block", {
        opacity: 1,
      });

      const wordBlock = gsap.utils.toArray(".letter");

      gsap.from(wordBlock, {
        y: "100%",
        opacity: 0,
        duration: duration || 1,
        stagger: 0.02,
        ease: ease || "back.out(1.4)",
        delay: delay || 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });
    },
    { scope: container, dependencies: [animate] },
  );
  return (
    <div className="relative flex flex-col" ref={container}>
      {words.map((line, lineIdx) => (
        <span key={lineIdx}>
          {line.split(" ").map((word, wordIdx) => (
            <span className="inline-block" key={wordIdx + word}>
              {word.split("").map((letter, letterIdx) => (
                <Fragment key={letterIdx + letter}>
                  <span className="relative inline-flex overflow-hidden">
                    <span className="letter">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  </span>
                  {wordIdx !== words.length - 1 &&
                  letterIdx === word.length - 1 &&
                  lineIdx !== words.length - 1 ? (
                    <span className="relative inline-flex overflow-hidden">
                      <span className="letter">{"\u00A0"}</span>
                    </span>
                  ) : null}
                </Fragment>
              ))}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
