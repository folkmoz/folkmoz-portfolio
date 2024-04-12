// @ts-nocheck
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GLTFResult = GLTF & {
  nodes: {
    heart_teamRed: THREE.Mesh;
  };
  materials: {
    ["Red.015"]: THREE.MeshStandardMaterial;
  };
};

type HeartModelProps = JSX.IntrinsicElements["group"] & {
  scrollTween: gsap.core.Tween;
};

export default function HeartModel(props: HeartModelProps) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/models/BlackHeart.gltf") as GLTFResult;

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime()) * 1.2;
    }
  });
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!group.current) return;
    const g = group.current;

    if (!props.scrollTween) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#Music",
          start: "45% bottom",
          end: "50% bottom",
          containerAnimation: props.scrollTween,
          scrub: true,
          anticipatePin: 1,
        },
      })
      .from(g.position, {
        y: -6,
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#Music",
          start: "67% bottom",
          end: "58% 70%",
          containerAnimation: props.scrollTween,
          scrub: true,
          anticipatePin: 1,
        },
      })
      .to(g.position, {
        y: 2.8,
        x: 0.5,
        z: -0.3,
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#Music",
          start: "95% bottom",
          end: "bottom bottom",
          containerAnimation: props.scrollTween,
          scrub: true,
          anticipatePin: 1,
        },
      })
      .to(g.position, {
        y: 5,
      });
  }, [props.scrollTween]);

  return (
    <group ref={group} {...props} dispose={null} position={[-1.8, -1.2, 0.3]}>
      <mesh
        geometry={nodes.heart_teamRed.geometry}
        material={materials["Red.015"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/BlackHeart.gltf");
