import { gsap } from "gsap";
import { useRef } from "react";
import AnimatedText from "#/components/AnimatedText";
import { useGSAP } from "@gsap/react";

const ContactSection = () => {
  return (
    <>
      <section
        className="h-screen w-full bg-white py-[5vh] pt-20 px-10"
        id="Contacts"
      >
        <div className="flex h-full flex-col">
          <div className="text-5xl font-bold md:text-8xl xl:text-9xl">
            <h3>
              <AnimatedText words={["Contacts"]} />
            </h3>
          </div>
          <div className="divide-primary border-primary mt-8 flex flex-1 flex-col divide-y-2 border-y-2">
            <ContactItem
              title={"Instagram"}
              account={"folk_moz"}
              subtitle={"daily uses"}
              href="https://www.instagram.com/folk_moz/"
            />
            <ContactItem
              title={"Email"}
              account={"jiran.folk"}
              subtitle={"for work"}
              href="mailto:jiran.folk@gmail.com"
            />
            <ContactItem
              title={"GitHub"}
              account={"folkmoz"}
              href="https://www.github.com/folkmoz"
            />
            <ContactItem
              title={"Bento"}
              account={"@folkmoz"}
              href="https://bento.me/folkmoz"
            />
          </div>
        </div>
      </section>
    </>
  );
};

type ContactItemProps = {
  title: string;
  subtitle?: string;
  account: string;
  bg?: string;
  href: string;
};

const ContactItem = ({ title, account, subtitle, href }: ContactItemProps) => {
  const clipRef = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP();

  const onHover = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = clipRef.current!.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const top = y < rect.height / 2;

    gsap.set(clipRef.current, {
      clipPath: top ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
    });
    gsap.to(clipRef.current, {
      clipPath: "inset(0 0 0 0)",
      duration: 0.1,
      ease: "power1",
    });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = clipRef.current!.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const bottom = y > rect.height / 2;

    gsap
      .timeline()
      .to(clipRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.2,
        ease: "power1",
      })
      .to(clipRef.current, {
        clipPath: bottom ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        duration: 0.1,
        ease: "power1",
      });
  });

  return (
    <a href={href} target="_blank" className="group relative md:flex-1">
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        data-cursor="link"
        className="h-full py-10 md:py-0"
      >
        <div className="flex h-full items-center justify-between">
          <div className="text-secondary flex items-end text-3xl font-medium md:text-5xl xl:text-[6vw]">
            <h4>{title}</h4>
            {subtitle && (
              <span className="hidden text-2xl italic sm:block md:text-4xl">
                — {subtitle}
              </span>
            )}
          </div>

          <div className="mr-12">
            <svg
              className="size-8 md:size-[64px]"
              viewBox="0 0 26 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.326857 22.1997C0.555793 22.4717 0.883413 22.6416 1.23764 22.6721C1.59187 22.7025 1.9437 22.591 2.21572 22.3621L22.3042 5.4554L21.607 13.5624C21.583 13.9131 21.6976 14.2592 21.9263 14.5261C22.155 14.7931 22.4793 14.9595 22.8295 14.9897C23.1797 15.0198 23.5278 14.9111 23.7987 14.6871C24.0696 14.4632 24.2416 14.1417 24.2778 13.7921L25.2526 2.45893C25.268 2.2847 25.2489 2.10912 25.1963 1.9423C25.1438 1.77548 25.0587 1.6207 24.9461 1.48686L24.9426 1.48276C24.8304 1.34942 24.6915 1.23853 24.5329 1.15829C24.3771 1.07697 24.2067 1.02739 24.0317 1.01243L12.6985 0.0377126C12.3478 0.0136832 12.0017 0.128349 11.7348 0.357015C11.4678 0.585681 11.3013 0.910051 11.2712 1.26026C11.2411 1.61047 11.3497 1.9585 11.5737 2.22939C11.7977 2.50028 12.1191 2.67236 12.4688 2.70856L20.5778 3.40408L0.48931 20.3108C0.217289 20.5397 0.047354 20.8674 0.0168882 21.2216C-0.0135776 21.5758 0.0979214 21.9276 0.326857 22.1997Z"
                fill="none"
                className="fill-secondary"
              />
            </svg>
          </div>
        </div>
        <div
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          ref={clipRef}
          className="bg-brown absolute inset-0 flex items-center gap-20 text-2xl font-bold text-white transition-all duration-300 md:text-4xl xl:text-8xl"
        >
          <MarqueeText text={account} />
          <MarqueeText text={account} />
        </div>
      </div>
    </a>
  );
};

const MarqueeText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      x: -(ref.current!.offsetWidth + 80),
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <div ref={ref} className="flex gap-20 italic">
      <div>{text}</div>
      <div>{text}</div>
      <div>{text}</div>
      <div>{text}</div>
      <div>{text}</div>
    </div>
  );
};

export default ContactSection;
