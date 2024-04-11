import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "./AboutMe";
import LifeStyle from "#/app/(app)/_components/InfoSection/LifeStyle";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const InfoSection = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "20% 90%",
        scrub: 1,
      },
      scale: 0.95,
      borderRadius: "24px",
    });

    // gsap.to(container.current, {
    //   backgroundColor: "#fff",
    //
    //   scrollTrigger: {
    //     trigger: container.current,
    //     start: "65% center",
    //     end: "bottom bottom",
    //     scrub: true,
    //   },
    // });

    gsap.to(container.current, {
      backgroundColor: "#000",

      scrollTrigger: {
        trigger: "#AboutMe",
        start: "88% 10%",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <div
      id="ScrollerContainer"
      ref={container}
      className="relative z-10 w-full overflow-hidden bg-[#000]"
    >
      <AboutMe />
      {/*<div className="h-[50vh]"></div>*/}
      <LifeStyle />
    </div>
  );
};

export default InfoSection;
