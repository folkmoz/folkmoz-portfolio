import AnimatedLink from "#/components/AnimatedLink";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

const Header = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.from("header", {
      yPercent: -100,
      opacity: 0,
      delay: 3.2,
      duration: 1,
      ease: "back.out(1.4)",
    });
  }, []);

  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="flex items-center justify-between py-10 px-4 lg:px-10">
        <div>
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            priority
          />
        </div>

        <div className="flex gap-4">
          <AnimatedLink text="About" />
          <AnimatedLink text="Projects" />
          <AnimatedLink text="Contact" />
        </div>
      </div>
    </header>
  );
};

export default Header;
