"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useLenis } from "@studio-freight/react-lenis";
import Tempus from "@studio-freight/tempus";
import { useEffect } from "react";

gsap.registerPlugin(useGSAP);
ScrollTrigger.defaults({ markers: process.env.NODE_ENV === "development" });

gsap.ticker.lagSmoothing(0);
gsap.ticker.remove(gsap.updateRoot);
Tempus?.add((time: number) => {
  gsap.updateRoot(time / 1000);
}, 0);

window.scrollTo(0, 0);
window.history.scrollRestoration = "manual";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.start();
  }, [lenis]);

  return (
    <ReactLenis root>
     {children}
    </ReactLenis>
  );
}
