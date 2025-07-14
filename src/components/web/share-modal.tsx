import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shareOptions = [
  {
    label: "Facebook",
    color: "bg-white text-black hover:bg-gray-100 dark:bg-[#222] dark:text-white dark:hover:bg-[#333] border border-gray-200 dark:border-gray-700",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
    ),
    onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'),
  },
  {
    label: "Twitter",
    color: "bg-white text-black hover:bg-gray-100 dark:bg-[#222] dark:text-white dark:hover:bg-[#333] border border-gray-200 dark:border-gray-700",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z"/></svg>
    ),
    onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank'),
  },
  {
    label: "LinkedIn",
    color: "bg-white text-black hover:bg-gray-100 dark:bg-[#222] dark:text-white dark:hover:bg-[#333] border border-gray-200 dark:border-gray-700",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
    ),
    onClick: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`, '_blank'),
  },
  {
    label: "Copy link",
    color: "bg-white text-black hover:bg-gray-100 dark:bg-[#222] dark:text-white dark:hover:bg-[#333] border border-gray-200 dark:border-gray-700",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    ),
    onClick: () => {navigator.clipboard.writeText(window.location.href); alert('Đã copy link!')},
  },
];

export default function ShareModal({ open, onOpenChange }: ShareModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40 transition-all duration-300" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-2xl flex flex-col animate-fade-in transition-all duration-300">
          <div className="flex justify-end items-center">
            <Dialog.Close asChild>
              <button className="p-2 rounded hover:bg-accent transition-colors">
                <X className="size-5 text-muted-foreground" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Title className="text-lg font-bold mb-4 text-center">Chia sẻ video</Dialog.Title>
          <div className="flex flex-col gap-3 w-full">
            {shareOptions.map((opt) => (
              <button
                key={opt.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full justify-center font-semibold text-base transition ${opt.color}`}
                onClick={opt.onClick}
                type="button"
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 