import AboutMe from "./AboutMe";
import LifeStyle from "#/app/(app)/_components/InfoSection/LifeStyle";
import ContactSection from "#/app/(app)/_components/Contact";

const InfoSection = () => {
  return (
    <>
      <div
        id="ScrollerContainer"
        className="bg-brown relative z-10 w-full overflow-hidden"
      >
        <AboutMe />
        <LifeStyle />
        <ContactSection />
      </div>
    </>
  );
};

export default InfoSection;
