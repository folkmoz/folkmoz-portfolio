import Canvas from "#/app/(app)/_components/Canvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const LifeStyle = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const scrollerWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const title = useRef<HTMLDivElement | null>(null);

  const [pinnedCV, setPinnedCV] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const containerWidth =
        scrollerRef.current!.offsetWidth - document.documentElement.clientWidth;

      gsap.to(scrollerRef.current, {
        x: () => -containerWidth,
        ease: "none",

        scrollTrigger: {
          trigger: scrollerRef.current,
          start: "top top",
          end: () => `+=${containerWidth}`,
          scrub: 0.5,
          pin: true,
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 40%",
          end: "90% bottom",
          scrub: 1,
          markers: false,
        },
        onComplete: () => {
          setPinnedCV(true);
        },
        onReverseComplete: () => {
          setPinnedCV(false);
        },
      });

      tl.from(title.current, {
        y: -200,
        opacity: 0,
        scale: 3,
        duration: 1,
      }).to(title.current!.querySelector("h3 > span"), {
        textShadow: "0px 3px 20px #00000070",
        color: "#fff",
      });

      tl.to(title.current?.querySelectorAll("i")!, {
        color: "#ff7200",
      });
    },
    { scope: container },
  );

  return (
    <>
      <div ref={scrollerWrapperRef} className="relative">
        <section
          id="ScrollerWrapper"
          ref={scrollerRef}
          className="relative flex h-screen w-[400%] flex-nowrap"
        >
          <div
            ref={container}
            className="relative flex h-screen w-full items-center justify-center will-change-transform"
            id="LifeStyle"
          >
            <div className="relative z-5 text-8xl font-bold xl:text-9xl">
              <div ref={title} className="mt-48">
                <h3>
                  <span>Know me</span>
                  <i>better</i>
                </h3>
              </div>
            </div>
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative flex h-full w-full items-center justify-center text-white will-change-transform"
            >
              {index + 1}
            </div>
          ))}
        </section>
        <Canvas pinnedCV={pinnedCV} />
      </div>
    </>
  );
};

export default LifeStyle;
