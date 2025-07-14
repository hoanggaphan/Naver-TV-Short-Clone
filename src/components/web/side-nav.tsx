'use client'

import Logo from "./logo";
import { Compass, Flame, PlusSquare, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import LoginModal from "./login-modal";
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { label: "Đề xuất", icon: Flame, url: '/' },
  { label: "Khám phá", icon: Compass, url: '/explore' },
  { label: "Tải lên", icon: PlusSquare, url: '/upload' },
  { label: "Hồ sơ", icon: User, url: '/profile' },
];

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      className="w-12 h-12 rounded-full border flex items-center justify-center mt-2 bg-accent/40 hover:bg-accent transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Chuyển đổi theme"
    >
      {isDark ? <Sun className="size-6" /> : <Moon className="size-6" />}
    </Button>
  );
}

export default function SideNav() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const session = useSession();
  const isAuthenticated = session?.status === "authenticated";
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col w-[240px] min-h-screen border-r border-border bg-background">
      <aside className="flex flex-col items-center py-6 gap-6 flex-1">
        <Logo />
        <nav className="flex flex-col gap-2 w-full mt-8">
          {navItems.map(({ label, icon: Icon, url }) => {
            const isActive = url === "/"
              ? pathname === "/"
              : pathname.startsWith(url);
            return (
              <Button
                key={label}
                asChild
                variant="ghost"
                className="flex items-center gap-4 px-6 py-3 rounded w-[90%] mx-auto text-lg font-semibold hover:bg-accent/60 transition-colors justify-start"
              >
                <Link href={url}>
                  <Icon className={cn("size-6", isActive && "text-[#03c75a]")} />
                  <span className={cn("hidden md:inline", isActive && "text-[#03c75a]")}>{label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
        {
            isAuthenticated ? 
            <Button
                className="w-[90%] bg-[#03c75a] text-white font-bold text-lg rounded py-3 hover:bg-[#02b150] transition-colors shadow-md"
                onClick={() => signOut({ redirect: false })}
            >
                Đăng xuất
            </Button> 
            : 
            <Button
                className="w-[90%] bg-[#03c75a] text-white font-bold text-lg rounded py-3 hover:bg-[#02b150] transition-colors shadow-md"
                onClick={() => setShowLoginModal(true)}
            >
                Đăng nhập
            </Button>
        }
      </aside>
      <div className="w-full flex flex-col items-center gap-2 pb-8">
        <ThemeToggleButton />
      </div>
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
