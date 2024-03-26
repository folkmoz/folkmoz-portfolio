"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Home = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [fname, lname] = "Jirantanapat Kaeosomboon"
    .split(" ")
    .map((word) => word.split(""));

  useGSAP(
    () => {
      gsap.from("span", {
        y: 100,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.4)",
      });
    },
    { scope: ref },
  );

  return (
    <div className="container">
      <main className="flex h-screen flex-col items-center justify-center">
        <div
          ref={ref}
          className="flex w-full flex-col items-center justify-center gap-4 overflow-hidden text-3xl transition-all duration-200 ease-in-out sm:flex-row md:text-6xl md:leading-[90px]"
        >
          <div>
            {fname.map((letter, index) => (
              <span className="inline-block" key={index}>
                {letter}
              </span>
            ))}
          </div>
          <div>
            {lname.map((letter, index) => (
              <span className="letter inline-block" key={index}>
                {letter}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a href="https://www.github.com/folkmoz" className="block p-4">
            My GitHub
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
