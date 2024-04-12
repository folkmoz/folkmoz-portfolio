"use client";
import Home from "./_components/Home";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 1,
      lerp: 0.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Home />
    </>
  );
}
