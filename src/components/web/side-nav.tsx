import Logo from "./logo";
import { Compass, Flame, PlusSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Đề xuất", icon: Flame },
  { label: "Khám phá", icon: Compass },
  { label: "Tải lên", icon: PlusSquare },
  { label: "Hồ sơ", icon: User },
];

export default function SideNav() {
  return (
    <div className="flex flex-col w-[240px] min-h-screen border-r border-border bg-background">
      <aside className="flex flex-col items-center py-6 gap-6">
        <Logo />
        <nav className="flex flex-col gap-2 w-full mt-8">
          {navItems.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              className="flex items-center gap-4 px-6 py-3 rounded w-[90%] mx-auto text-lg font-semibold hover:bg-accent/60 transition-colors justify-start"
            >
              <Icon className="size-6" />
              <span className="hidden md:inline">{label}</span>
            </Button>
          ))}
        </nav>
      </aside>
      <div className="w-full flex justify-center pb-8">
        <Button
          className="w-[90%] bg-[#03c75a] text-white font-bold text-lg rounded py-3 hover:bg-[#02b150] transition-colors shadow-md"
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
