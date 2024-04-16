// @ts-nocheck
import { Canvas as OriCanvas } from "@react-three/fiber";
import Headphone from "#/components/Models/Headphone";
import HeartModel from "#/components/Models/Heart";
import { Environment, OrbitControls } from "@react-three/drei";
import PirateCap from "#/components/Models/PirateCap";
import Renderer from "three/examples/jsm/renderers/common/Renderer";
import WebGL from "three/examples/jsm/capabilities/WebGL";

type CanvasProps = {
  pinnedCV: boolean;
  scrollTween: gsap.core.Tween;
};

const Canvas = ({ pinnedCV, scrollTween }: CanvasProps) => {
  return (
    <OriCanvas
      className="hidden md:block"
      id={"Canvas"}
      style={{
        pointerEvents: "none",
        width: "100vw",
        height: "100svh",
        position: pinnedCV ? "fixed" : "absolute",
        inset: 0,
        zIndex: -1,
      }}
      performance={{ min: 0.5, max: 1 }}
      // camera={{ position: [0, 0, 10], fov: 70 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Headphone scrollTween={scrollTween} />
      <PirateCap scrollTween={scrollTween} />
      <HeartModel scrollTween={scrollTween} />
      {/*<OrbitControls  />*/}
      <Environment preset="sunset" />
    </OriCanvas>
  );
};

export default Canvas;
