// @ts-nocheck
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
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

type HeadphoneProps = JSX.IntrinsicElements["group"] & {
  scrollTween: gsap.core.Tween;
};

export default function Headphone(props: HeadphoneProps) {
  const [rotation, setRotation] = useState(false);
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/models/Headphones.gltf") as GLTFResult;

  useFrame(({ clock }) => {
    if (group.current) {
      if (rotation) {
        group.current.rotation.y = group.current.rotation.y + 0.005;
      }
    }
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!group.current) return;
    const g = group.current;

    // Scale for the first time
    gsap.from(g.position, {
      y: -2.5,
      z: -2,
      scrollTrigger: {
        trigger: "#LifeStyle",
        start: "top 80%",
        end: "bottom 95%",
        markers: false,
        scrub: 1,
      },
    });
    if (!props.scrollTween) return;

    // Rotate the headphone
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#LifeStyle",
          start: "top top",
          end: "bottom center",
          containerAnimation: props.scrollTween,
          scrub: 1,
        },
        onComplete: () => setRotation(true),
        onReverseComplete: () => setRotation(false),
      })
      .to(g.rotation, {
        y: 1.6 * Math.PI,

        duration: 1,
      });

    // Move the headphone
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#LifeStyle",
          start: "10% top",
          end: "bottom top",
          containerAnimation: props.scrollTween,
          scrub: 1,
        },
      })
      .to(g.position, {
        x: 3.5,
        y: 0.7,
        z: 1,
      })
      .to(
        g?.scale,
        {
          x: 0.7,
          y: 0.7,
          z: 0.7,
        },
        0,
      );

    // Move out the headphone
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#Music",
          start: "35% center",
          end: "45% center",
          containerAnimation: props.scrollTween,
          scrub: 1,
        },
      })
      .to(g.position, {
        y: 4,
      });
  }, [props.scrollTween]);

  return (
    <group ref={group} {...props} dispose={null} position={[0, -1.5, 2]}>
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
