import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
// @ts-ignore
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Ear_Cup: THREE.Mesh;
    Cushion: THREE.Mesh;
    ["Mid-"]: THREE.Mesh;
    Seprator001: THREE.Mesh;
    Seprator: THREE.Mesh;
    Cylinder025: THREE.Mesh;
    Cylinder025_1: THREE.Mesh;
  };
  materials: {
    ["Black-1"]: THREE.MeshStandardMaterial;
    Cushion: THREE.MeshStandardMaterial;
    ["Black-2"]: THREE.MeshStandardMaterial;
    Connector: THREE.MeshStandardMaterial;
    GlowBlue: THREE.MeshStandardMaterial;
  };
};

export default function Headphone(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/models/Headphones.gltf") as GLTFResult;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!group.current) return;

    const g = group.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#LifeStyle",
        start: "top 80%",
        end: "bottom bottom",
        markers: false,
        scrub: 1,
      },
    });
    //
    // tl.from(g?.position, {
    //   y: -2.5,
    //   z: -2,
    // });
  });

  useFrame(({ clock }) => {
    if (group.current) {
      // const rotation = 1.25 + Math.sin(clock.getElapsedTime()) * 0.25; // This will give a value between 0 and 1.5
      // group.current.rotation.y = rotation;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} position={[0, -1.2, 2]}>
      <mesh
        geometry={nodes.Ear_Cup.geometry}
        material={nodes.Ear_Cup.material}
      />
      <mesh geometry={nodes.Cushion.geometry} material={materials.Cushion} />
      <mesh geometry={nodes["Mid-"].geometry} material={materials["Black-2"]} />
      <mesh
        geometry={nodes.Seprator001.geometry}
        material={nodes.Seprator001.material}
      />
      <mesh geometry={nodes.Seprator.geometry} material={materials.Connector} />
      <mesh
        geometry={nodes.Cylinder025.geometry}
        material={nodes.Cylinder025.material}
      />
      <mesh
        geometry={nodes.Cylinder025_1.geometry}
        material={materials.GlowBlue}
      />
    </group>
  );
}

useGLTF.preload("/models/Headphones.gltf");
