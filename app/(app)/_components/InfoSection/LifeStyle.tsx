import Canvas from "#/app/(app)/_components/Canvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import FirstSection from "#/app/(app)/_components/InfoSection/LifeStyleSections/FirstSection";
import SecondarySection from "#/app/(app)/_components/InfoSection/LifeStyleSections/SecondarySection";
import ThirdSection from "#/app/(app)/_components/InfoSection/LifeStyleSections/ThirdSection";

const LifeStyle = () => {
  const scrollerWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [pinnedCV, setPinnedCV] = useState(false);
  const scrollTween = useRef<gsap.core.Tween>();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!scrollerRef.current) return;

      const containerWidth =
        scrollerRef.current!.offsetWidth - document.documentElement.clientWidth;

      scrollTween.current = gsap.to(scrollerRef.current, {
        x: () => -containerWidth,
        ease: "none",

        scrollTrigger: {
          trigger: scrollerRef.current,
          start: "top top",
          end: () => `+=${containerWidth}`,
          scrub: 0.5,
          pin: true,
          // invalidateOnRefresh: true,
        },
      });
    },
    {
      scope: scrollerWrapperRef,
    },
  );

  return (
    <>
      <div ref={scrollerWrapperRef} className="relative">
        <section
          id="ScrollerWrapper"
          ref={scrollerRef}
          className="relative flex h-screen w-[350%] flex-nowrap overflow-hidden"
        >
          <FirstSection
            setPinned={setPinnedCV}
            scrollTween={scrollTween.current!}
          />
          <SecondarySection scrollTween={scrollTween.current!} />
          <ThirdSection scrollTween={scrollTween.current!} />
        </section>
        <Canvas pinnedCV={pinnedCV} scrollTween={scrollTween.current!} />
      </div>
    </>
  );
};

export default LifeStyle;
