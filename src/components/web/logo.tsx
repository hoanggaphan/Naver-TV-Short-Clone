import { PlayCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";
  const textMain = isDark ? "white" : "#222";

  return (
    <div className="flex items-center justify-center gap-2 select-none cursor-pointer">
      <PlayCircle className="size-8 drop-shadow" style={{ color: "#03c75a" }} />
      <h1 className="text-3xl font-extrabold tracking-tight uppercase">
        <span
          style={{ color: textMain, transition: 'color 0.4s cubic-bezier(.4,0,.2,1)' }}
        >
          short
        </span>
        <span className="ml-1" style={{ color: "#03c75a" }}>tv</span>
      </h1>
    </div>
  );
}
