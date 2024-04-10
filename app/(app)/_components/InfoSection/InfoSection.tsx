import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "./AboutMe";
import LifeStyle from "#/app/(app)/_components/InfoSection/LifeStyle";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const InfoSection = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // const containerWidth =
      //   scrollerRef.current!.offsetWidth - document.documentElement.clientWidth;
      //
      // gsap.to(scrollerRef.current, {
      //   x: () => -containerWidth,
      //   ease: "none",
      //
      //   scrollTrigger: {
      //     trigger: scrollerRef.current,
      //     start: "top top",
      //     end: () => `+=${containerWidth}`,
      //     scrub: 0.5,
      //     pin: true,
      //     markers: true,
      //     invalidateOnRefresh: true,
      //   },
      // });

      // gsap.from(container.current, {
      //   scrollTrigger: {
      //     trigger: container.current,
      //     start: "top bottom",
      //     end: "20% 90%",
      //     scrub: 1,
      //   },
      //   scale: 0.95,
      //   borderRadius: "24px",
      // });

      // gsap.to(container.current, {
      //   backgroundColor: "#fff",
      //
      //   scrollTrigger: {
      //     trigger: container.current,
      //     start: "65% center",
      //     end: "bottom bottom",
      //     scrub: true,
      //     markers: true,
      //   },
      // });

      gsap.to(container.current, {
        backgroundColor: "#faebd7",

        scrollTrigger: {
          trigger: "#about-me",
          start: "88% 10%",
          end: "bottom 10%",
          scrub: true,
          markers: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative z-10 mt-[-00svh] w-full overflow-hidden bg-[#faebd7]"
    >
      {/*<AboutMe />*/}
      <div className="h-screen"></div>
      <LifeStyle />
    </div>
  );
};

export default InfoSection;
