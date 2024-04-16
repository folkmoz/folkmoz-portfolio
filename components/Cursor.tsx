"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [text, setText] = useState("Click");
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const cursor = useRef<HTMLDivElement | null>(null);
  const tooltip = useRef<HTMLSpanElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(cursor.current, {
        opacity: 0,
      });

      xTo.current = gsap.quickTo(cursor.current, "x", {
        duration: 0.8,
        ease: "power2",
      });
      yTo.current = gsap.quickTo(cursor.current, "y", {
        duration: 0.8,
        ease: "power2",
      });
    },
    { scope: cursor },
  );

  const moveCursor = contextSafe((e: MouseEvent) => {
    if (!xTo.current || !yTo.current) return;

    const isLink = (e.target as HTMLElement).matches("a, button");
    //check if target has a parent with a data-cursor attribute
    const isTarget =
      (e.target as HTMLElement).closest("[data-cursor=link]") !== null;
    if (isTarget) setText("Visit");
    else setText("Click");

    // xTo.current(e.clientX + (isTarget ? 0 : 10));
    // yTo.current(e.clientY + (isTarget ? 0 : 20));

    xTo.current(e.clientX);
    yTo.current(e.clientY);

    gsap.to(cursor.current, {
      mixBlendMode: isTarget ? "normal" : "difference",
      width: isTarget ? 120 : 20,
      height: isTarget ? 120 : 20,
      duration: 0.4,
      ease: "power1",
    });

    if (tooltip.current) {
      gsap.to(tooltip.current, {
        opacity: isTarget ? 1 : 0,
        duration: 0.8,
      });
    }

    if (isTarget) setIsHovering(true);
    else setIsHovering(false);
  });

  const moveOutOfScreen = contextSafe(() => {
    if (!xTo.current || !yTo.current) return;

    gsap.to(cursor.current, {
      opacity: 0,
    });
  });

  const moveIntoScreen = contextSafe(() => {
    if (!xTo.current || !yTo.current) return;

    gsap.to(cursor.current, {
      opacity: 1,
    });
  });

  useEffect(() => {
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", moveOutOfScreen);
    document.addEventListener("mouseenter", moveIntoScreen);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", moveOutOfScreen);
      document.removeEventListener("mouseenter", moveIntoScreen);
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex size-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white opacity-0"
    >
      {isHovering ? (
        <span ref={tooltip} className="text-brown opacity-0">
          {text}
        </span>
      ) : null}
    </div>
  );
};

export default Cursor;
