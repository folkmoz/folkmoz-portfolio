import Canvas from "#/app/(app)/_components/Canvas";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import FirstSection from "#/app/(app)/_components/InfoSection/LifeStyleSections/FirstSection";
import SecondarySection from "#/app/(app)/_components/InfoSection/LifeStyleSections/SecondarySection";
import ThirdSection from "#/app/(app)/_components/InfoSection/LifeStyleSections/ThirdSection";

const LifeStyle = () => {
  const [scrollTween, setScrollTween] = useState<gsap.core.Tween>();
  const scrollerWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [pinnedCV, setPinnedCV] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const containerWidth =
        scrollerRef.current!.offsetWidth - document.documentElement.clientWidth;

      const tl = gsap.to(scrollerRef.current, {
        x: () => -containerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: scrollerRef.current,
          start: "top top",
          end: () => `+=${containerWidth}`,
          scrub: 0.5,
          pin: true,
        },
      });

      setScrollTween(tl);
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
          className="flex h-screen w-[320%] flex-nowrap overflow-hidden"
        >
          <FirstSection setPinned={setPinnedCV} scrollTween={scrollTween!} />
          <SecondarySection scrollTween={scrollTween!} />
          <ThirdSection scrollTween={scrollTween!} />
        </section>

        <Canvas pinnedCV={pinnedCV} scrollTween={scrollTween!} />
      </div>
    </>
  );
};

export default LifeStyle;
