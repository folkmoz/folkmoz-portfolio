import AboutMe from "./AboutMe";
import LifeStyle from "#/app/(app)/_components/InfoSection/LifeStyle";

const InfoSection = () => {
  return (
    <>
      <div
        id="ScrollerContainer"
        className="bg-brown relative z-10 w-full overflow-hidden"
      >
        <AboutMe />
        <LifeStyle />
      </div>
      <div className="h-screen"></div>
    </>
  );
};

export default InfoSection;
