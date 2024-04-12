import { Canvas as OriCanvas } from "@react-three/fiber";
import Headphone from "#/components/Models/Headphone";
import HeartModel from "#/components/Models/Heart";
import { Environment, OrbitControls } from "@react-three/drei";
import PirateCap from "#/components/Models/PirateCap";

type CanvasProps = {
  pinnedCV: boolean;
  scrollTween: gsap.core.Tween;
};

const Canvas = ({ pinnedCV, scrollTween }: CanvasProps) => {
  return (
    <OriCanvas
      id={"Canvas"}
      style={{
        pointerEvents: "none",
        width: "100vw",
        height: "100svh",
        position: pinnedCV ? "fixed" : "absolute",
        inset: 0,
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Headphone scrollTween={scrollTween} />
      {/*<Stone />*/}
      <PirateCap scrollTween={scrollTween} />
      <HeartModel scrollTween={scrollTween} />
      {/*<OrbitControls  />*/}
      <Environment preset="sunset" />
    </OriCanvas>
  );
};

export default Canvas;
