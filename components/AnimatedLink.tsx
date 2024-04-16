type AnimatedLinkProps = {
  text: string;
};

const AnimatedLink = ({ text }: AnimatedLinkProps) => {
  return (
    <a
      href={`#${text.replace(" ", "")}`}
      className="group relative block overflow-hidden text-center font-medium transition-all duration-300 ease-in-out"
    >
      <span className="h-100 relative top-0 block transition-all duration-300 ease-in-out group-hover:top-[-100%]">
        {text}
      </span>
      <span className="absolute top-full left-0 h-full w-full transition-all duration-300 ease-in-out group-hover:top-0">
        {text}
      </span>
    </a>
  );
};

export default AnimatedLink;
