"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const cursor = useRef<HTMLDivElement | null>(null);
  const tooltip = useRef<HTMLSpanElement | null>(null);

  const { context, contextSafe } = useGSAP(
    () => {
      gsap.set(cursor.current, {
        opacity: 0,
      });

      xTo.current = gsap.quickTo(cursor.current, "x", {
        duration: 0.8,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(cursor.current, "y", {
        duration: 0.8,
        ease: "power3",
      });
    },
    { scope: cursor },
  );

  const moveCursor = contextSafe((e: MouseEvent) => {
    if (!xTo.current || !yTo.current) return;

    const isTarget = (e.target as HTMLElement).matches("a, button");

    xTo.current(e.clientX + (isTarget ? 0 : 10));
    yTo.current(e.clientY + (isTarget ? 0 : 20));

    gsap.to(cursor.current, {
      width: isTarget ? 100 : 16,
      height: isTarget ? 100 : 16,
      duration: 0.8,
      ease: "power4",
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
      className="bg-primary pointer-events-none fixed top-0 left-0 z-[9999] flex size-4 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full"
    >
      {isHovering ? (
        <span ref={tooltip} className="text-primary-foreground opacity-0">
          Click
        </span>
      ) : null}
    </div>
  );
};

export default Cursor;
