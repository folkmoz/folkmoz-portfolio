"use client";

import HeroSection from "./HeroSection";
import Header from "./Header";
import InfoSection from "#/app/(app)/_components/InfoSection/InfoSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };

    return () => {
      window.onbeforeunload = () => {
        window.scrollTo(0, 0);
      };
    };
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center">
        <HeroSection />
        <InfoSection />
      </main>
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
    </>
  );
};

export default Home;
