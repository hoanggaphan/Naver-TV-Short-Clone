'use client';

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
    </Button>
  );
}