"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
  "16.png",
];

const InfoSection = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const testRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const containerWidth =
        scrollContainer.current!.offsetWidth -
        document.documentElement.clientWidth;

      gsap.to(scrollContainer.current, {
        x: () => -containerWidth,
        ease: "none",

        scrollTrigger: {
          trigger: scrollContainer.current,
          start: "top top",
          end: () => `+=${containerWidth}`,
          scrub: 0.5,
          pin: true,
          markers: true,
          invalidateOnRefresh: true,
        },
      });

      const columns = columnsRef.current;
      // @ts-ignore
      const [column1, column2, column3, column4] = columns!.children;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: testRef.current,
            start: "top bottom",
            end: () => `+=${containerWidth}`,
            scrub: 1,
            markers: true,
          },
        })
        .fromTo(column1!, { yPercent: 20 }, { yPercent: -40 })
        .fromTo(column2!, { yPercent: -78 }, { yPercent: 50 }, 0)
        .fromTo(column3!, { yPercent: 40 }, { yPercent: -35 }, 0)
        .fromTo(column4!, { yPercent: -120 }, { yPercent: 10 }, 0);
    },
    { scope: container },
  );
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className={"h-[100vh] bg-yellow-200"}>
        <h1>Hello</h1>
      </div>
      <div className={"relative"}>
        <div ref={container}>
          <section
            ref={scrollContainer}
            className="flex h-screen w-[550%] flex-nowrap overflow-hidden bg-black"
          >
            <div className="relative flex h-full w-full items-center justify-center will-change-transform">
              Hello
            </div>
            <div
              ref={testRef}
              className="relative flex h-full w-[150%] items-center justify-center  will-change-transform"
            >
              {/*<div className="before:blur-0 before:backdrop-blur-0 before:absolute before:inset-0 before:z-0 before:z-10 before:rotate-0 before:rotate-30 before:scale-100 before:scale-150 before:bg-gradient-to-r before:from-[#000] before:to-[#fff] before:opacity-50 before:blur-[10px] before:backdrop-blur-[10px] before:backdrop-brightness-100 before:backdrop-brightness-200 before:backdrop-opacity-100 before:backdrop-opacity-50 before:backdrop-saturate-100 before:backdrop-saturate-200 before:backdrop-contrast-100 before:backdrop-contrast-200 before:backdrop-filter before:backdrop-filter before:transition-transform before:delay-100 before:duration-300 before:ease-in-out before:will-change-transform" />*/}
              <div
                ref={columnsRef}
                className="flex -rotate-30 scale-[1.4] gap-1 grayscale-100"
              >
                <Column
                  images={[images[4], images[10], images[14], images[9]]}
                />
                <Column
                  images={[images[1], images[8], images[3], images[11]]}
                />
                <Column
                  images={[images[7], images[2], images[5], images[12]]}
                />
                <Column
                  images={[images[0], images[13], images[6], images[15]]}
                />
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative flex h-full w-full items-center justify-center will-change-transform"
              >
                {index + 2}
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className={"h-screen bg-yellow-200"}>
        <h1> world</h1>
      </div>
    </>
  );
};

type ColumnProps = {
  images: string[];
};

const Column = ({ images }: ColumnProps) => {
  return (
    <div className="relative flex flex-1 flex-col gap-1">
      <div className="before:absolute before:inset-0 before:z-[1] before:bg-black/80" />

      {images.map((src, i) => {
        return (
          <div key={i} className="h-full w-full overflow-hidden rounded-md">
            <img
              src={`/images/mtns/${src}`}
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default InfoSection;
