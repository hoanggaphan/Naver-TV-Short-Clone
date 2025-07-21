"use client"

import { Button } from "@/components/ui/button";
import { Flame, Compass, PlusSquare, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "./login-modal";

const navItems = [
  { label: "Đề xuất", icon: Flame, url: "/", requireAuth: false },
  { label: "Khám phá", icon: Compass, url: "/explore", requireAuth: false },
  { label: "Tải lên", icon: PlusSquare, url: "/upload", requireAuth: true },
  { label: "Hồ sơ", icon: User, url: "/profile", requireAuth: true },
];

export default function BottomNav() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const pathname = usePathname();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleNavClick = (item: typeof navItems[0]) => {
    if (!item.requireAuth || isAuthenticated) {
      router.push(item.url);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full h-[50px] bg-[#18181b] flex flex-row justify-between items-center z-50 md:hidden">
        {navItems.map((item) => {
          const { label, icon: Icon, url } = item;
          const isActive = url === "/" ? pathname === "/" : pathname.startsWith(url);
          return (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              className="flex-1 flex flex-col items-center justify-center gap-0 h-full rounded-none hover:bg-accent/60 transition-colors"
              onClick={() => handleNavClick(item)}
            >
              <Icon className={isActive ? "size-6 text-[#03c75a]" : "size-6 text-muted-foreground"} />
              <span className={isActive ? "text-[10px] mt-0.5 text-[#03c75a] font-semibold" : "text-[10px] mt-0.5 text-muted-foreground"}>{label}</span>
            </Button>
          );
        })}
      </nav>
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
