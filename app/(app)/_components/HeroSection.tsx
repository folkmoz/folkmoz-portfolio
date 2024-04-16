import { gsap } from "gsap";
import AnimatedText from "#/components/AnimatedText";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "lucide-react";
import Lenis from "@studio-freight/lenis";

const HeroSection = () => {
  const [finishedLoading, setFinishedLoading] = useState(false);
  const wavingHand = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const flareRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const waveDown = () =>
    gsap.to(wavingHand.current, { rotate: -15, duration: 0.2 });
  const waveUp = () =>
    gsap.to(wavingHand.current, { rotate: 15, duration: 0.2 });

  const initSmoothScroll = () => {
    const lenis = new Lenis({});

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!container.current || !wavingHand.current) return;
      const halfScreenWidth = window.innerWidth / 2;
      const halfScreenHeight = window.innerHeight / 2;
      const wHandWidth = wavingHand.current.getBoundingClientRect();

      const posY = halfScreenHeight - (wHandWidth.y + wHandWidth.height / 2);
      const posX = halfScreenWidth - (wHandWidth.x + wHandWidth.width / 2);

      gsap.set(wavingHand.current, {
        x: posX,
        y: posY,
        scale: 0,
      });

      const tl = gsap.timeline({});
      tl.to(wavingHand.current, {
        scale: 1,
        delay: 0.3,
        duration: 0.5,
        ease: "back.out(1.4)",
        // onStart: () => initSmoothScroll(),
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
          x: 0,
          y: 0,
          duration: 1,
          ease: "power4.out",
          onComplete: () => {
            setFinishedLoading(true);
          },
        })
        .fromTo(
          document.documentElement,
          {
            overflow: "hidden",
          },
          {
            overflow: "unset",
            delay: 0.5,
            onStart: () => {
              initSmoothScroll();
            },
          },
        );

      gsap.from(wavingHand.current.querySelector("div"), {
        opacity: 0,
        delay: 3.2,
      });

      gsap
        .timeline()
        .from(ringRef.current, {
          scale: 0,
          opacity: 0,
          delay: 3.5,
          duration: 1,
          ease: "back.out(1.7)",
        })
        .from(
          flareRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "<",
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: "power4.out",
          },
          "<",
        );

      gsap.to([titleRef.current, scrollRef.current], {
        opacity: 0,
        // scale: 0.8,
        yPercent: -50,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom 55%",
          scrub: 1,
        },
      });
    },

    { scope: container },
  );

  return (
    <section ref={container} className="sticky top-0">
      <div className="bg-background relative flex h-screen w-screen flex-col justify-center p-4 lg:p-8">
        <div
          ref={titleRef}
          className="relative flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-start"
        >
          <div>
            <div className="relative p-10" ref={wavingHand}>
              <span className="text-4xl lg:text-7xl">👋🏼</span>
              <div className="border-accent absolute inset-0 rounded-full border"></div>
            </div>
          </div>
          <div className="relative flex flex-col lg:ml-12">
            <h1 className="sr-only">Hello, I&apos;m FOLKMOZ</h1>
            <h1 className="text-text-color relative whitespace-nowrap  text-4xl font-bold uppercase leading-tight sm:text-6xl lg:text-[120px]">
              <AnimatedText
                words={["Hello, I'm", "FOLKMOZ."]}
                animate={finishedLoading}
              />
              <div
                ref={ringRef}
                className="border-text-color absolute  bottom-0 -left-[50px] h-1/2 w-[calc(100%+100px)] rounded-full border-4"
              ></div>
            </h1>
            <div
              ref={flareRef}
              className="bg-primary absolute -right-8 -bottom-4 z-[-1] size-[170px] rounded-full blur-[100px]"
            ></div>
          </div>
        </div>

        <span
          ref={scrollRef}
          className="text-primary absolute right-4 bottom-28 flex rotate-90 items-center text-xl"
        >
          Scroll
          <ArrowRightIcon className="ml-2 h-6 w-6" />
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
