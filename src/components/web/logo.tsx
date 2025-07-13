import { PlayCircle } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 select-none cursor-pointer">
      <PlayCircle className="size-8 text-[#03c75a] drop-shadow" />
      <h1 className="text-3xl font-extrabold tracking-tight uppercase">
        <span className="text-white">short</span>
        <span className="text-[#03c75a] ml-1">tv</span>
      </h1>
    </div>
  );
}
