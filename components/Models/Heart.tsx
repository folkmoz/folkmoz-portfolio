import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
// @ts-ignore
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";

type GLTFResult = GLTF & {
  nodes: {
    heart_teamRed: THREE.Mesh;
  };
  materials: {
    ["Red.015"]: THREE.MeshStandardMaterial;
  };
};

export default function HeartModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/heart/model.gltf",
  ) as GLTFResult;

  const { viewport, camera } = useThree();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  useGSAP(() => {
    if (!group.current) return;

    const g = group.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#LifeStyle",
        start: "top 20%",
        end: "bottom bottom",
        markers: true,
        scrub: 1,
      },
    });

    if (viewport.width < 768) {
    }

    tl.fromTo(
      g.position,
      {
        y: -2,
      },
      {
        y: -2,
        x: 2,
      },
    );
  });

  return (
    <group ref={group} {...props} dispose={null} position={[0, 0, 2]}>
      <mesh
        geometry={nodes.heart_teamRed.geometry}
        material={materials["Red.015"]}
        rotation={[Math.PI / 2, -0.5, 1]}
      />
    </group>
  );
}

useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/heart/model.gltf",
);
