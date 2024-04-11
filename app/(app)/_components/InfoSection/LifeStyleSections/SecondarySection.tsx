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
        .fromTo(column3!, { yPercent: 40 }, { yPercent: -35 }, 0)
        .fromTo(column4!, { yPercent: -120 }, { yPercent: 10 }, 0);

      const letters = textRef.current?.querySelectorAll("div > h3 > span")!;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "left 70%",
            end: "bottom 35%",
            scrub: 1,
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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "left center",
            end: "bottom 40%",
            scrub: 1,
            containerAnimation: scrollTween,
          },
        })
        .fromTo(
          subTextRef.current,
          {
            xPercent: 150,
          },
          {
            xPercent: -150,
          },
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "44% 70%",
            end: "bottom top",
            scrub: 1,
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

      gsap.to(letters!, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 30%",
          end: "center 60%",
          scrub: true,
          containerAnimation: scrollTween,
        },
        stagger: 0.1,
        color: "#7fffd4",
      });
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
        className="relative flex h-full w-[150%] items-center justify-center will-change-transform"
      >
        <div
          ref={textRef}
          className="absolute top-1/2 left-[10%] z-[5] w-[120%] -translate-y-1/2"
        >
          <div className="text-8xl font-bold uppercase text-white">
            <h3>{splitWords('"Without music, life would be a mistake"')}</h3>
          </div>
        </div>
        <div
          ref={subTextRef}
          className="absolute top-2/3 left-[30%] z-[5] w-[120%] -translate-y-1/2"
        >
          <div className="text-7xl font-bold uppercase italic leading-[1.5] text-white">
            <h3>— Friedrich Nietzsche</h3>
          </div>
        </div>

        <div
          ref={paragraphRef}
          className="absolute top-1/2 left-[70%] z-[5] w-[120%] -translate-y-1/2"
        >
          <div className="text-4xl font-bold uppercase  leading-[1.5] text-white">
            <h3>
              I extremely like to listen to music, it&apos;s a big part of my
              life. <br />
              <span className="ml-12" />I can listen to music all day long,
              it&apos;s like a therapy for me. <br />
              <span className="ml-24" />
              And I was listening to music when I was creating this website
              also. <br />
              <span className="ml-36" />
              So, I can&apos;t imagine my life without music. <i>(folk)</i>
            </h3>
          </div>
        </div>

        <ImageItem
          src="2.png"
          right="22%"
          top="10%"
          width={300}
          scrollTween={scrollTween}
        />
        <ImageItem src="3.png" right="6%" top={"0"} scrollTween={scrollTween} />
        <ImageItem
          src="4.png"
          right="40%"
          top={"-5px"}
          scrollTween={scrollTween}
        />
        <ImageItem
          src="5.png"
          right="2%"
          top={"45%"}
          scrollTween={scrollTween}
        />
        <ImageItem src="6.png" right="70%" scrollTween={scrollTween} />
        <ImageItem
          src="7.png"
          right="18%"
          top={"50%"}
          scrollTween={scrollTween}
        />
        <ImageItem
          src="8.png"
          right="55%"
          top="10%"
          scrollTween={scrollTween}
        />
        <ImageItem
          src="9.png"
          right="50%"
          top="60%"
          scrollTween={scrollTween}
        />
        <ImageItem
          src="10.png"
          right="33%"
          top="50%"
          scrollTween={scrollTween}
        />

        <div className="before:blur-0 before:backdrop-blur-0 before:absolute before:inset-0 before:z-0 before:z-10 before:rotate-0 before:rotate-30 before:scale-100 before:scale-150 before:bg-gradient-to-r before:from-[#000] before:to-[#fff] before:opacity-50 before:blur-[10px] before:backdrop-blur-[10px] before:backdrop-brightness-100 before:backdrop-brightness-200 before:backdrop-opacity-100 before:backdrop-opacity-50 before:backdrop-saturate-100 before:backdrop-saturate-200 before:backdrop-contrast-100 before:backdrop-contrast-200 before:backdrop-filter before:backdrop-filter before:transition-transform before:delay-100 before:duration-300 before:ease-in-out before:will-change-transform" />
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
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "center 90%",
        containerAnimation: scrollTween,
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
      className="image-item absolute z-[3] overflow-hidden rounded-sm opacity-50 grayscale-100 will-change-transform"
    >
      {/*<span className="text-white">{src}</span>*/}
      <img src={`/images/mlyrics/${src}`} alt="" width={width} />
    </div>
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

export default SecondarySection;
