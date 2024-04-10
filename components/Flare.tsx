import { cn } from "#/lib/utils";

type FlareProps = {
  opacity?: number;
  blur?: number;
  color?: string;
  size?: number;
  className?: string;
};

const Flare = ({
  blur = 100,
  color = "bg-primary",
  size = 170,
  className,
}: FlareProps) => {
  return (
    <div
      style={{
        filter: `blur(${blur}px)`,
        width: size,
        height: size,
      }}
      className={cn("absolute rounded-full", color, className)}
    ></div>
  );
};

export default Flare;
