import { Hourglass } from "lucide-react";

export default function Explore() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Hourglass size={64} className="text-gray-400 mb-6 animate-pulse" />
      <h1 className="text-3xl font-bold mb-2">Coming Soon</h1>
      <p className="text-gray-500 text-lg max-w-md">
        Tính năng khám phá sẽ sớm ra mắt! Hãy quay lại sau để trải nghiệm những video thú vị nhất.
      </p>
    </div>
  );
}
