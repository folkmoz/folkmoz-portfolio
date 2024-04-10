import { Canvas as OriCanvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Headphone from "#/components/Models/Headphone";
import HeartModel from "#/components/Models/Heart";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Environment } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type CanvasProps = {
  pinnedCv: boolean;
};

const Canvas = ({ pinnedCv }: CanvasProps) => {
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
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100svh",
        position: pinnedCv ? "fixed" : "absolute",
        inset: 0,
        zIndex: -1,
      }}
      // camera={{ position: [0, 0, 20], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/*<Suspense fallback={null}>*/}
      <Headphone />
      {/*<HeartModel />*/}
      {/*</Suspense>*/}
      <Environment preset="sunset" />
    </OriCanvas>
  );
};

export default Canvas;
