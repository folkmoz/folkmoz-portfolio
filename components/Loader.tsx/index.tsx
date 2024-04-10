"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

type LoaderProps = {
  setLoading: (value: boolean) => void;
};

const Loader = ({ setLoading }: LoaderProps) => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const wavingHand = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const svgCurve = useRef<SVGPathElement | null>(null);

  const waveDown = () =>
    gsap.to(wavingHand.current, { rotate: -15, duration: 0.2 });
  const waveUp = () =>
    gsap.to(wavingHand.current, { rotate: 15, duration: 0.2 });

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useGSAP(
    () => {
      //   gsap.set("[data-title]", { display: "none" });
      const letters = document.querySelectorAll("[data-title] span div");

      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(true);
        },
      });
      tl.from(wavingHand.current, {
        scale: 0,
        delay: 0.3,
        duration: 0.5,
        ease: "back.out(1.4)",
      })
        .add(waveDown())
        .add(waveUp())
        .add(waveDown())
        .add(waveUp())
        .add(waveDown())
        .to(wavingHand.current, {
          rotate: 0,
        })
        .to(wavingHand.current, {
          x: -80,
          duration: 1,
          ease: "power4.out",
        })
        .to(
          letters,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.inOut",
            stagger: 0.1,
          },
          "<",
        );
    },
    { scope: container },
  );

  return (
    <div
      className="fixed z-[100] flex h-screen h-screen w-screen items-center justify-center"
      ref={container}
    >
      <div className="flex items-center gap-4">
        <div ref={wavingHand} className="absolute">
          <motion.span layoutId="wavinghand" className="text-6xl">
            👋🏼
          </motion.span>
        </div>
        <div className="text-primary flex text-[80px] font-bold " data-title>
          {"Hi".split("").map((letter, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <div className="translate-x-[-100%] opacity-0">{letter}</div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
