import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedText from "#/components/AnimatedText";

const ExperienceSection = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      "#ScrollerContainer",
      {
        // backgroundColor: "#000",
      },
      {
        // backgroundColor: "#fff",
        scrollTrigger: {
          trigger: container.current,
          start: "top 40%",
          end: "top top",
          scrub: 1,
        },
      },
    );
  });

  return (
    <div ref={container} className="relative flex h-full w-full text-white">
      <div className="flex h-full w-full flex-col gap-8 pb-20 md:gap-36 md:pt-[20vh] md:px-36 md:pb-[40vw] 2xl:px-[15vw]">
        <div className="flex flex-col justify-between  md:flex-row">
          <div className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl">
            <h4 className="leading-[1.2]">
              <AnimatedText words={["Hobby."]} />
            </h4>
          </div>
          <div className="md:w-1/2">
            <ul className="list-inside list-disc text-2xl md:mt-8">
              <li>
                <span>Listening to music</span>
              </li>
              <li>
                <span>Playing games</span>
              </li>
              <li>
                <span>Watching movies/series</span>
              </li>
              <li>
                <span>
                  Working out and trying to maintain a healthy lifestyle
                </span>
              </li>
              <li>
                <span>Exploring new technologies and learning new things</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <div className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl">
            <h4 className="leading-[1.2]">
              <AnimatedText words={["Experience."]} />
            </h4>
          </div>
          <div className="md:w-1/2">
            <div>
              <div className="text-3xl md:mt-8">
                <h5>
                  <span>Web development</span>
                </h5>
              </div>
              <ul className="list-inside list-disc text-2xl text-gray-300">
                <li>
                  <span>React</span>
                </li>
                <li>
                  <span>
                    Next.js <i className="text-primary text-sm">+ Typescript</i>
                  </span>
                </li>
                <li>
                  <span>Tailwind CSS</span>
                </li>

                <li>
                  <span>
                    Animation{" "}
                    <i className="text-primary text-sm">
                      (GSAP, Framer Motion)
                    </i>
                  </span>
                </li>
                <li>
                  <span>Vercel</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-3xl md:mt-24">
                <h5>
                  <span>DevOps</span>
                </h5>
              </div>
              <ul className="list-inside list-disc text-xl">
                <li>
                  <span>Git</span>
                </li>
                <li>
                  <span>
                    Docker <i className="text-primary text-sm">+ Compose</i>
                  </span>
                </li>
                <li>
                  <span>
                    GitHub Actions{" "}
                    <i className="text-primary text-sm">+ Workflows</i>
                  </span>
                </li>
                <li>
                  <span>
                    Azure App Service{" "}
                    <i className="text-primary text-sm">+ CI/CD</i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between  md:flex-row">
          <div className="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl">
            <h4 className="leading-[1.2]">
              <AnimatedText words={["Tools I use."]} />
            </h4>
          </div>
          <div className="md:w-1/2">
            <ul className="list-inside list-disc text-2xl md:mt-8">
              <li>
                <span>
                  Webstorm <i className="text-primary text-sm">+ Vscode</i>
                </span>
              </li>
              <li>
                <span>
                  Figma <i className="text-primary text-sm">(learning)</i>
                </span>
              </li>
              <li>
                <span>Notion</span>
              </li>
              <li>
                <span>
                  Postman <i className="text-primary text-sm">+ Apidog</i>
                </span>
              </li>
              <li>
                <span>ChatGPT</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 w-[100%]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L24,170.7C48,181,96,203,144,218.7C192,235,240,245,288,256C336,267,384,277,432,256C480,235,528,181,576,176C624,171,672,213,720,208C768,203,816,149,864,128C912,107,960,117,1008,138.7C1056,160,1104,192,1152,197.3C1200,203,1248,181,1296,176C1344,171,1392,181,1416,186.7L1440,192L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ExperienceSection;
