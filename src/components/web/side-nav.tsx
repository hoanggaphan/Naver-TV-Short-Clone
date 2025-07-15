'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Compass, Flame, Moon, PlusSquare, Sun, User } from "lucide-react";
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoginModal from "./login-modal";
import Logo from "./logo";

const navItems = [
  { label: "Đề xuất", icon: Flame, url: '/', requireAuth: false },
  { label: "Khám phá", icon: Compass, url: '/explore', requireAuth: false },
  { label: "Tải lên", icon: PlusSquare, url: '/upload', requireAuth: true },
  { label: "Hồ sơ", icon: User, url: '/profile', requireAuth: true },
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
  
  const handleNavItemClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    // Nếu item yêu cầu authentication và user chưa đăng nhập
    if (item.requireAuth && !isAuthenticated) {
      e.preventDefault(); // Ngăn navigation
      setShowLoginModal(true); // Hiển thị login modal
    }
    // Nếu đã đăng nhập hoặc không yêu cầu auth thì để Link tự xử lý navigation
  };

  // Hàm kiểm tra route hiện tại có requireAuth không
  const isCurrentRouteProtected = () => {
    // Tìm navItem có url khớp với pathname
    const found = navItems.find(item => {
      if (item.url === "/") return pathname === "/";
      return pathname.startsWith(item.url);
    });
    return found?.requireAuth;
  };

  const handleLogout = async () => {
    if (isCurrentRouteProtected()) {
      await signOut({ redirect: true });
    } else {
      await signOut({ redirect: false });
    }
  };
  
  return (
    <div className="flex flex-col w-[240px] min-h-screen border-r border-border bg-background">
      <aside className="flex flex-col items-center py-6 gap-6 flex-1">
        <Logo />
        <nav className="flex flex-col gap-2 w-full mt-8">
          {navItems.map((item) => {
            const { label, icon: Icon, url, requireAuth } = item;
            const isActive = url === "/"
              ? pathname === "/"
              : pathname.startsWith(url);
            
            return (
              <Button
                key={label}
                asChild={!requireAuth || isAuthenticated} // Chỉ dùng asChild khi không cần auth hoặc đã auth
                variant="ghost"
                className="flex items-center gap-4 px-6 py-3 rounded w-[90%] mx-auto text-lg font-semibold hover:bg-accent/60 transition-colors justify-start"
                onClick={requireAuth && !isAuthenticated ? (e) => handleNavItemClick(item, e) : undefined}
              >
                {(!requireAuth || isAuthenticated) ? (
                  <Link href={url}>
                    <Icon className={cn("size-6", isActive && "text-[#03c75a]")} />
                    <span className={cn("hidden md:inline", isActive && "text-[#03c75a]")}>{label}</span>
                  </Link>
                ) : (
                  <>
                    <Icon className="size-6" />
                    <span className="hidden md:inline">{label}</span>
                  </>
                )}
              </Button>
            );
          })}
        </nav>
        {
            isAuthenticated ? 
            <Button
                className="w-[90%] bg-[#03c75a] text-white font-bold text-lg rounded py-3 hover:bg-[#02b150] transition-colors shadow-md"
                onClick={handleLogout}
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
