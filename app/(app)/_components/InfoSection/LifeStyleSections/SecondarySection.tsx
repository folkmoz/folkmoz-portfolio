import { cn } from "#/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import image1 from "#/public/images/mtns/1.png";
import image2 from "#/public/images/mtns/2.png";
import image3 from "#/public/images/mtns/3.png";
import image4 from "#/public/images/mtns/4.png";
import image5 from "#/public/images/mtns/5.png";
import image6 from "#/public/images/mtns/6.png";
import image7 from "#/public/images/mtns/7.png";
import image8 from "#/public/images/mtns/8.png";
import image9 from "#/public/images/mtns/9.png";
import image10 from "#/public/images/mtns/10.png";
import image11 from "#/public/images/mtns/11.png";
import image12 from "#/public/images/mtns/12.png";
import image13 from "#/public/images/mtns/13.png";
import image14 from "#/public/images/mtns/14.png";
import image15 from "#/public/images/mtns/15.png";
import image16 from "#/public/images/mtns/16.png";
import Image, { StaticImageData } from "next/image";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
];

type SecondarySectionProps = {
  scrollTween: gsap.core.Tween;
};

const SecondarySection = ({ scrollTween }: SecondarySectionProps) => {
  const [doAddEvent, setDoAddEvent] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const subTextRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const godDanceRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP();

  const onMove = contextSafe((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { x, y } = container.current!.getBoundingClientRect();

    // tilt effect
    const tiltX = (clientX - x) / container.current!.offsetWidth - 0.8;
    const tiltY = (clientY - y) / container.current!.offsetHeight - 0.8;

    const columns = columnsRef.current;
    gsap.to(columns, {
      x: tiltX * 100,
      y: tiltY * 100,
    });

    const images = container.current!.querySelectorAll(".image-item");
    images.forEach((img, i) => {
      const random = Math.random() * (50 - 20) + 20;

      gsap.to(img, {
        x: tiltY * (i % 2 === 0 ? random : -random),
        y: tiltX * (i % 2 === 0 ? random : -random),
      });
    });
  });

  useGSAP(
    () => {
      if (!scrollTween) return;
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.innerWidth < 480;

      gsap.to(columnsRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "40% center",
          scrub: 1,
          containerAnimation: scrollTween,
        },
        onStart: () => {
          setDoAddEvent(true);
        },
        onReverseComplete: () => {
          setDoAddEvent(false);
        },
      });

      const columns = columnsRef.current;
      // @ts-ignore
      const [column1, column2, column3, column4] = columns!.children;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            containerAnimation: scrollTween,
          },
        })
        .fromTo(column1!, { yPercent: 20 }, { yPercent: -40 })
        .fromTo(column2!, { yPercent: -78 }, { yPercent: 50 }, 0)
        .fromTo(column3!, { yPercent: 65 }, { yPercent: -20 }, 0)
        .fromTo(column4!, { yPercent: -120 }, { yPercent: 10 }, 0);

      const letters = textRef.current?.querySelectorAll("div > h3 > span")!;

      // title animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "left 80%",
            end: "bottom 35%",
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .fromTo(
          textRef.current,
          {
            xPercent: 100,
          },
          {
            xPercent: -150,
          },
        );

      // subtitle animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "5% center",
            end: "bottom 45%",
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .fromTo(
          subTextRef.current,
          {
            xPercent: 100,
          },
          {
            xPercent: -300,
          },
        );

      // paragraph animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "center 60%",
            end: "bottom 30%",
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .fromTo(
          paragraphRef.current,
          {
            xPercent: 30,
          },
          {
            xPercent: -200,
          },
        );

      gsap.to(container.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "center 60%",
          end: "bottom top",
          scrub: true,
          containerAnimation: scrollTween,
          // toggleClass: "overflow-hidden",
        },
      });

      // God dance animation
      const backdrop = godDanceRef.current!.querySelector("div")!;
      const label = godDanceRef.current!.querySelector("span")!;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: godDanceRef.current,
            start: "top bottom",
            end: () =>
              `+=${godDanceRef.current!.offsetWidth * (isMobile ? 0.3 : 0.5)}`,
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .from(godDanceRef.current, {
          xPercent: isMobile ? 65 : 100,
        })
        .to(godDanceRef.current, {
          ease: "power4.inOut",
          scale: 1,
        })
        .to(
          backdrop,
          {
            opacity: 0,
          },
          "-=0.1",
        )
        .to(
          label,
          {
            opacity: 1,
          },
          "<",
        );
      // .to(
      //   spotlightRef.current,
      //   {
      //     opacity: 1,
      //   },
      //   "-=0.9",
      // );
    },
    { dependencies: [scrollTween] },
  );

  useEffect(() => {
    if (doAddEvent) {
      window.addEventListener("mousemove", onMove);
    } else {
      window.removeEventListener("mousemove", onMove);
    }
  }, [doAddEvent, onMove]);

  return (
    <>
      <div
        id="Music"
        ref={container}
        className="relative flex h-full w-[200%] items-center justify-center bg-black will-change-transform md:w-[120%]"
      >
        <div
          ref={textRef}
          className="absolute top-1/2 left-[10%] z-[5] w-max -translate-y-1/2"
        >
          <div className="relative bg-gradient-to-r from-black to-transparent text-5xl font-bold uppercase text-white md:text-8xl">
            <div className="absolute -top-10 -left-10 size-10 sm:top-[-70px] sm:left-[-70px] sm:size-[70px]">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
                fill="#000000"
                transform="matrix(-1, 0, 0, -1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g id="right_x5F_quote">
                      <g>
                        <path
                          style={{ fill: "#ffffff" }}
                          d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"
                        ></path>
                        <path
                          style={{ fill: "#ffffff" }}
                          d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <h3>
              Without <i className="text-green-500">music</i>, life would be a
              mistake.
            </h3>
          </div>
        </div>
        <div
          ref={subTextRef}
          className="absolute top-[60%] left-[30%] z-[5] w-max -translate-y-1/2 md:top-2/3"
        >
          <div className="bg-[#8e8064] pr-8 text-4xl font-bold uppercase italic leading-[1.5] md:text-7xl">
            <h3>— Friedrich Nietzsche</h3>
          </div>
        </div>
        <div
          ref={paragraphRef}
          className="absolute top-1/2 left-[70%] z-[5] w-full max-w-lg -translate-y-1/2 md:w-full md:max-w-full"
        >
          <div className="text-2xl font-medium leading-[1.5] text-white md:text-4xl">
            <h3>
              <span className="ml-12 sm:ml-24">For me</span>, music is the
              soundtrack of my life. I can listen{" "}
              <br className="hidden md:block" />
              endlessly, it&apos;s therapeutic. I even had it playing while
              building <br className="hidden md:block" /> this site. So, life
              without music is{" "}
              <span className="italic underline">unimaginable</span>.
            </h3>
          </div>
        </div>
        <div className="absolute top-0 right-0 z-[20] grid h-screen w-screen grid-cols-16 grid-rows-12">
          <div
            ref={godDanceRef}
            style={{ scale: 0.5 }}
            className="image-item relative col-start-5 col-end-17 row-start-5 row-end-8 rounded-sm rounded-sm  bg-black grayscale-100 will-change-transform md:col-start-11 md:col-end-16 md:row-start-8 md:row-end-12"
          >
            <span className="absolute -top-6 right-0 text-white opacity-0">
              Me.jpg{" "}
            </span>
            <div className="absolute inset-0 z-10 bg-black"></div>
            <img
              src={"/images/GodDanceStep.gif"}
              alt="me dacning..."
              className="h-full w-full rounded-sm object-cover"
            />
          </div>
        </div>

        <div className="absolute top-0 right-0 z-[5] grid h-screen w-screen grid-cols-16 grid-rows-12">
          <ImageItem
            src="RickAstleyThrowback.gif"
            className={"col-span-3 col-start-5 row-span-3 row-start-3"}
            scrollTween={scrollTween}
          />

          <ImageItem
            src="TeamDance.gif"
            className={"col-span-3 col-start-13 row-span-3 row-start-2"}
            scrollTween={scrollTween}
          />

          <ImageItem
            src="KidsDancing.gif"
            className={"col-span-3 col-start-9 row-span-3 row-start-4"}
            scrollTween={scrollTween}
          />
          <ImageItem
            src="DrivingMyMusic.gif"
            className={"col-span-3 col-start-6 row-span-3 row-start-8"}
            scrollTween={scrollTween}
          />
        </div>

        {/*<div ref={spotlightRef} className="before:blur-0 before:backdrop-blur-0 opacity-0 before:absolute before:inset-0 before:z-0 before:z-10 before:rotate-0 before:rotate-30 before:scale-100 before:scale-150 before:bg-gradient-to-r before:from-[#000] before:to-[#fff] before:opacity-50 before:blur-[10px] before:backdrop-blur-[10px] before:backdrop-brightness-100 before:backdrop-brightness-200 before:backdrop-opacity-100 before:backdrop-opacity-50 before:backdrop-saturate-100 before:backdrop-saturate-200 before:backdrop-contrast-100 before:backdrop-contrast-200 before:backdrop-filter before:backdrop-filter before:transition-transform before:delay-100 before:duration-300 before:ease-in-out before:will-change-transform" />*/}
        <div
          ref={columnsRef}
          className="flex -rotate-30 scale-[1.3] gap-1 opacity-0 grayscale-100"
        >
          <Column images={[images[4], images[10], images[14], images[9]]} />
          <Column images={[images[1], images[8], images[3], images[11]]} />
          <Column images={[images[7], images[2], images[0], images[5]]} />
          <Column images={[images[12], images[13], images[6], images[15]]} />
        </div>
      </div>
    </>
  );
};

type ImageItemProps = {
  src: string;
  right?: string;
  top?: string;
  scale?: number;
  width?: number;
  scrollTween?: gsap.core.Tween;
  className?: string;
};

const ImageItem = ({
  src,
  right,
  top,
  scale = 1,
  scrollTween,
  className,
}: ImageItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!scrollTween) return;

    gsap.to(ref.current, {
      webkitClipPath: "inset(0% 0% 0% 0%)",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.5 + Math.random() * 0.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#Music",
        start: "bottom 89%",
        containerAnimation: scrollTween,
        toggleActions: "play none none reverse",
      },
    });
  }, [scrollTween]);

  return (
    <div
      ref={ref}
      style={{
        right,
        top,
        scale,
        clipPath: "inset(0 100% 0 0)",
      }}
      className={cn(
        "image-item hidden overflow-hidden rounded-sm grayscale-100 will-change-transform md:block",
        className,
      )}
    >
      <img src={`/images/${src}`} className="h-full w-full object-cover" />
    </div>
  );
};

type ColumnProps = {
  images: StaticImageData[];
};

const Column = ({ images }: ColumnProps) => {
  return (
    <div className="relative flex flex-1 flex-col gap-1">
      <div className="before:absolute before:inset-0 before:z-[1] before:bg-black/90" />

      {images.map((image, i) => {
        return (
          <div key={i} className="h-full w-full overflow-hidden rounded-md">
            <Image
              src={image}
              className="object-cover"
              alt={""}
              loading="eager"
              width={350}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SecondarySection;
