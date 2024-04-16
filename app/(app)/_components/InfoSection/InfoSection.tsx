import AboutMe from "./AboutMe";
import LifeStyle from "#/app/(app)/_components/InfoSection/LifeStyle";
import ContactSection from "#/app/(app)/_components/Contact";
import ExperienceSection from "#/app/(app)/_components/ExperienceSection";

const InfoSection = () => {
  return (
    <>
      <div
        id="ScrollerContainer"
        className="bg-brown relative z-10 w-full overflow-hidden"
      >
        <AboutMe />
        <LifeStyle />
        <ExperienceSection />

        <ContactSection />
      </div>
    </>
  );
};

export default InfoSection;
