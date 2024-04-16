import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "#/components/AnimatedText";
import Flare from "#/components/Flare";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { splitWords } from "#/lib/utils";
import profileImage from "#/public/images/Me.jpg";

const phrase = `        Hey there! I'm folk, a 3rd-year Information Technology student at Bangkok University. I have a huge passion for coding, especially web development. In my free time, you'll likely find me working on coding projects or watching various YouTube contents.`;

const AboutMe = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const paragraph = useRef<HTMLParagraphElement | null>(null);
  const profileRef = useRef<HTMLImageElement | null>(null);
  const svg = useRef<SVGSVGElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const letters = paragraph.current?.querySelectorAll(".inline-block > span");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "70% center",
          scrub: 1,
        },
      })
      .fromTo(letters!, { opacity: 0.2 }, { opacity: 1, stagger: 0.01 });

    gsap.fromTo(
      profileRef.current,
      {
        y: 200,
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 1,
        },
      },
    );

    gsap.from(svg.current, {
      scale: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top 40%",
        end: "center 60%",
        scrub: 1,
      },
    });

    gsap.to(container.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: container.current,
        start: "center 5%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "90% bottom",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .fromTo(
        "#ScrollerContainer",
        {
          backgroundColor: "#23211a",
        },
        {
          backgroundColor: "#000",
        },
      );
  });

  return (
    <section
      id="AboutMe"
      ref={container}
      className="text-accent relative mb-32 min-h-screen p-8 pb-[10vh] opacity-[0.99] lg:pb-[30vh]"
    >
      <div className="relative flex flex-col gap-8 p-4 lg:pt-20 lg:px-20">
        <div className="relative z-5">
          <h2 className="text-secondary -mb-20 text-6xl font-bold uppercase text-white mix-blend-difference mix-blend-exclusion md:text-8xl lg:leading-[1.5] xl:text-9xl">
            <AnimatedText words={["About me."]} />
          </h2>
        </div>
        <div className="relative z-[2] flex justify-center">
          <Image
            loading={"eager"}
            ref={profileRef}
            src={profileImage}
            alt="Jirantanapat Kaeosomboon"
            width={500}
            className="rounded-xl object-cover grayscale-100"
          />
        </div>
        <div className="relative z-5 flex w-full justify-end">
          <div className="-mt-12 text-2xl font-medium sm:max-w-[70%] md:max-w-[40vw] md:text-3xl">
            <p className="leading-[1.2]" ref={paragraph}>
              {splitWords(phrase)}
            </p>
          </div>
        </div>

        <span className="absolute top-[45%] left-1/2 z-1 -translate-x-1/2 -translate-y-1/2 opacity-20">
          <svg
            ref={svg}
            className="fill-primary lg:size-[800px]"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_43_11)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.5551 132.889C61.4006 132.889 66.8325 131.403 71.5617 128.806C88.6012 119.448 111.398 119.448 128.437 128.806C133.166 131.403 138.598 132.889 144.444 132.889C162.853 132.889 177.777 117.965 177.777 99.5556C177.777 81.1461 162.853 66.2223 144.444 66.2223C138.598 66.2223 133.166 67.708 128.437 70.3051C111.398 79.6627 88.6012 79.6627 71.5617 70.3051C66.8326 67.708 61.4006 66.2223 55.5551 66.2223C37.1456 66.2223 22.2217 81.1461 22.2217 99.5556C22.2217 117.965 37.1456 132.889 55.5551 132.889ZM82.2586 148.284C92.6361 142.585 107.363 142.585 117.74 148.284C125.665 152.636 134.765 155.111 144.444 155.111C175.126 155.111 200 130.238 200 99.5556C200 68.8731 175.126 44 144.444 44C134.765 44 125.665 46.4751 117.74 50.8268C107.363 56.5258 92.6361 56.5258 82.2586 50.8268C74.3345 46.4751 65.2338 44 55.5551 44C24.8726 44 -0.000498905 68.8731 -0.000500246 99.5556C-0.000501588 130.238 24.8726 155.111 55.5551 155.111C65.2338 155.111 74.3344 152.636 82.2586 148.284Z"
                fill="ืnone"
              />
            </g>
            <defs>
              <clipPath id="clip0_43_11">
                <rect
                  width="200"
                  height="200"
                  fill="white"
                  transform="translate(200 3.05176e-05) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <Flare />
        <Flare className="right-4 bottom-0" size={100} blur={120} />
        <Flare
          className="top-1/2 right-1/3 z-[1] hidden -translate-x-6 -translate-y-28 md:block"
          blur={50}
          size={150}
        />
      </div>
    </section>
  );
};

export default AboutMe;
