import { splitWords } from "#/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

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
      gsap.to(img, {
        x: tiltY * 50,
        y: tiltX * 50,
      });
    });
  });

  useGSAP(
    () => {
      if (!scrollTween) return;
      gsap.registerPlugin(ScrollTrigger);

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
          toggleClass: "overflow-hidden",
        },
      });

      // God dance animation
      const backdrop = godDanceRef.current!.querySelector("div")!;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: godDanceRef.current,
            start: "20% bottom",
            end: () => `+=${godDanceRef.current!.offsetWidth * 0.83}`,
            scrub: true,
            containerAnimation: scrollTween,
          },
        })
        .fromTo(
          godDanceRef.current,
          {
            xPercent: 110,
          },
          {
            xPercent: -80.5,
          },
          0,
        )
        .to(godDanceRef.current, {
          ease: "power4.inOut",
          scale: 1.8,
        })
        .to(
          backdrop,
          {
            opacity: 0,
          },
          "-=0.1",
        )
        .to(
          spotlightRef.current,
          {
            opacity: 1,
          },
          "-=0.9",
        );
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
        className="relative flex h-full w-[120%] items-center justify-center bg-black will-change-transform"
      >
        <div
          ref={textRef}
          className="absolute top-1/2 left-[10%] z-[5] w-[125%] -translate-y-1/2"
        >
          <div className="relative bg-gradient-to-r from-black to-transparent text-8xl font-bold uppercase text-white">
            <div className="absolute top-[-70px] left-[-70px] size-[70px]">
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
                  {" "}
                  <g>
                    {" "}
                    <g id="right_x5F_quote">
                      {" "}
                      <g>
                        {" "}
                        <path
                          style={{ fill: "#ffffff" }}
                          d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z"
                        ></path>
                        <path
                          style={{ fill: "#ffffff" }}
                          d="M20,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z"
                        ></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
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
          className="absolute top-2/3 left-[30%] z-[5] -translate-y-1/2"
        >
          <div className="bg-[#8e8064] pr-8 text-7xl font-bold uppercase italic leading-[1.5]">
            <h3>— Friedrich Nietzsche</h3>
          </div>
        </div>
        <div
          ref={paragraphRef}
          className="absolute top-1/2 left-[70%] z-[5] w-full -translate-y-1/2"
        >
          <div className="text-4xl font-medium leading-[1.5] text-white">
            <h3>
              <span className="ml-24">For me</span>
              , music is the soundtrack of my life. <br /> I can listen
              endlessly, it&apos;s therapeutic. I even had it playing <br />{" "}
              while building this site. So, life without music is unimaginable.
            </h3>
          </div>
        </div>
        <div
          ref={godDanceRef}
          className="image-item absolute right-0 bottom-[14%] z-[50] overflow-hidden rounded-sm bg-black grayscale-100 will-change-transform"
        >
          <div className="absolute inset-0 z-10 bg-black"></div>
          <img src={"/images/GodDanceStep.gif"} alt="" width={300} />
        </div>
        <ImageItem
          src="TeamDance.gif"
          right="4%"
          top="10%"
          width={250}
          scrollTween={scrollTween}
        />
        <ImageItem
          src="DrivingMyMusic.gif"
          right="40%"
          top="50%"
          width={300}
          scrollTween={scrollTween}
        />
        <ImageItem
          src="RickAstleyThrowback.gif"
          right="40%"
          top="10%"
          width={300}
          scrollTween={scrollTween}
        />
        <ImageItem
          src="KidsDancing.gif"
          right="20.5%"
          top="30%"
          width={300}
          scrollTween={scrollTween}
        />

        <div
          ref={spotlightRef}
          className="before:blur-0 before:backdrop-blur-0 opacity-0 before:absolute before:inset-0 before:z-0 before:z-10 before:rotate-0 before:rotate-30 before:scale-100 before:scale-150 before:bg-gradient-to-r before:from-[#000] before:to-[#fff] before:opacity-50 before:blur-[10px] before:backdrop-blur-[10px] before:backdrop-brightness-100 before:backdrop-brightness-200 before:backdrop-opacity-100 before:backdrop-opacity-50 before:backdrop-saturate-100 before:backdrop-saturate-200 before:backdrop-contrast-100 before:backdrop-contrast-200 before:backdrop-filter before:backdrop-filter before:transition-transform before:delay-100 before:duration-300 before:ease-in-out before:will-change-transform"
        />
        <div
          ref={columnsRef}
          className="flex -rotate-30 scale-[1.4] gap-1 opacity-0 grayscale-100"
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
};

const ImageItem = ({
  src,
  right,
  top,
  scale = 1,
  width = 200,
  scrollTween,
}: ImageItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!scrollTween) return;

    gsap.to(ref.current, {
      webkitClipPath: "inset(0% 0% 0% 0%)",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1 + Math.random() * 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#Music",
        start: "bottom 85%",
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
      className="image-item absolute z-[3] overflow-hidden rounded-sm grayscale-100 will-change-transform"
    >
      {/*<span className="text-white">{src}</span>*/}
      <img src={`/images/${src}`} alt="" width={width} />
    </div>
  );
};

type ColumnProps = {
  images: string[];
};

const Column = ({ images }: ColumnProps) => {
  return (
    <div className="relative flex flex-1 flex-col gap-1">
      <div className="before:absolute before:inset-0 before:z-[1] before:bg-black/85" />

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

export default SecondarySection;
