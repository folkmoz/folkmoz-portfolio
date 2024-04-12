import AboutMe from "./AboutMe";
import LifeStyle from "#/app/(app)/_components/InfoSection/LifeStyle";

const InfoSection = () => {
  return (
    <div
      id="ScrollerContainer"
      className="bg-brown relative z-10 w-full overflow-hidden"
    >
      <AboutMe />
      {/*<div className="h-[50vh]"></div>*/}
      <LifeStyle />
    </div>
  );
};

export default InfoSection;
