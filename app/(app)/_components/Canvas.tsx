import { Canvas as OriCanvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Headphone from "#/components/Models/Headphone";
import HeartModel from "#/components/Models/Heart";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Stone from "#/components/Models/Stone";
import PirateCap from "#/components/Models/PirateCap";

type CanvasProps = {
  pinnedCV: boolean;
  scrollTween: gsap.core.Tween;
};

const Canvas = ({ pinnedCV, scrollTween }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // gsap.to(canvasRef.current, {
    //   position: "fixed",
    //   scrollTrigger: {
    //     trigger: "#LifeStyle",
    //     start: "top top",
    //     end: "bottom bottom",
    //   },
    // });
  });

  return (
    <OriCanvas
      id={"Canvas"}
      ref={canvasRef}
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
      {/*<Suspense fallback={null}>*/}
      <Headphone scrollTween={scrollTween} />
      {/*<Stone />*/}
      <PirateCap scrollTween={scrollTween} />
      <HeartModel scrollTween={scrollTween} />
      {/*</Suspense>*/}
      {/*<OrbitControls  />*/}
      <Environment preset="sunset" />
    </OriCanvas>
  );
};

export default Canvas;
