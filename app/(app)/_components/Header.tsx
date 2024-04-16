import AnimatedLink from "#/components/AnimatedLink";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
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
          <img src="/images/Logo.svg" alt="Logo" width={80} height={80} />
        </div>

        <div className="flex gap-4">
          <AnimatedLink text="About Me" />
          <AnimatedLink text="Contacts" />
        </div>
      </div>
    </header>
  );
};

export default Header;
