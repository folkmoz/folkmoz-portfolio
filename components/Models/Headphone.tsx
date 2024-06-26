// @ts-nocheck
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

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
  const [mounted, setMounted] = useState(false);
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
    if (mounted) return;
    if (!props.scrollTween || !group.current) return;

    const g = group.current;

    const isMobile = window.innerWidth < 480;
    if (isMobile) {
      gsap.set(g.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
      });

      gsap.set(g.position, {
        y: -0.5,
      });
    }

    // Scale for the first time
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(g.position, {
      y: -2,
      z: -2,
      scrollTrigger: {
        trigger: "#LifeStyle",
        start: "top 80%",
        end: "bottom 95%",
        markers: false,
        scrub: true,
      },
    });

    setMounted(true);

    // Rotate the headphone
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#LifeStyle",
          start: "top top",
          end: "bottom center",
          containerAnimation: props.scrollTween,
          scrub: true,
        },
        onComplete: () => setRotation(true),
        onReverseComplete: () => setRotation(false),
      })
      .to(g.rotation, {
        y: 1.6 * Math.PI,

        duration: 1,
      });

    // Move to top
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#LifeStyle",
          start: "10% top",
          end: "bottom 20%",
          containerAnimation: props.scrollTween,
          scrub: true,
        },
      })
      .to(g.position, {
        x: isMobile ? 0 : 3.5,
        y: isMobile ? 1.3 : 1,
        z: 1,
      })
      .to(
        g?.scale,
        {
          x: isMobile ? 0.4 : 0.5,
          y: isMobile ? 0.4 : 0.5,
          z: isMobile ? 0.4 : 0.5,
        },
        0,
      );

    // Move out the headphone
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#Music",
          start: "35% center",
          end: isMobile ? "70% 30%" : "40% center",
          containerAnimation: props.scrollTween,
          scrub: true,
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
