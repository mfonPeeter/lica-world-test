interface ToolTipInterface {
  text: string;
}

export default function ToolTip({ text }: ToolTipInterface) {
  return (
    <div
      className="absolute top-full opacity-0 left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 py-1 w-[82px] text-[10.5px] text-gray-50 font-semibold transition-opacity duration-300  group-hover:opacity-100"
      role="tooltip"
    >
      <span className="absolute -top-1.5 left-1/2 -z-10 h-3 w-3 -translate-x-1/2 rotate-45 bg-gray-900"></span>
      {text}
    </div>
  );
}
