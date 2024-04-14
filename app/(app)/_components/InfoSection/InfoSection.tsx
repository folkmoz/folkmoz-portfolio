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
        {/*<div className="after:w-fulll before:w-fulll before:absolute before:inset-0 before:h-full before:bg-[#494545] before:opacity-20 before:filter-[url(#noiseFilter)] after:absolute after:inset-0 after:h-full after:opacity-20" />*/}
      </div>
      <div className="h-screen"></div>
    </>
  );
};

export default InfoSection;
