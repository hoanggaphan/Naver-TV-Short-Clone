"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { SVGProps } from "react";

function GoogleSVG(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="#fff"
          d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z"
        ></path>
        <path
          fill="#e33629"
          d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z"
        ></path>
        <path
          fill="#f8bd00"
          d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z"
        ></path>
        <path
          fill="#587dbd"
          d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
        ></path>
        <path
          fill="#319f43"
          d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z"
        ></path>
      </svg>
    )
}

function FacebookSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="#1877F2"
        d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
      ></path>
      <path
        fill="#FFF"
        d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
      ></path>
    </svg>
  );
}

function GithubSVG(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 259.3 256"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="#9EDCF2"
          d="M200.9 199.8c0 13.9-32.2 25.1-71.9 25.1s-71.9-11.3-71.9-25.1c0-13.9 32.2-25.1 71.9-25.1s71.9 11.2 71.9 25.1m0 0"
        ></path>
        <defs>
          <path
            id="logosGithubOctocat0"
            d="M98.1 244.8c1.6 7.5 5.5 11.9 9.4 14.5h41.1c5-3.4 10.1-9.8 10.1-21.8v-31s.6-7.7 7.7-10.2c0 0 4.1-2.9-.3-4.5c0 0-19.5-1.6-19.5 14.4v23.6s.8 8.7-3.8 12.3v-29.2s.3-9.3 5.1-12.8c0 0 3.2-5.7-3.8-4.2c0 0-13.4 1.9-14 17.6l-.3 30h-3.2l-.3-30c-.6-15.6-14-17.6-14-17.6c-7-1.6-3.8 4.2-3.8 4.2c4.8 3.5 5.1 12.8 5.1 12.8v29.5c-4.6-3.3-3.8-12.6-3.8-12.6v-23.6c0-16-19.5-14.4-19.5-14.4c-4.5 1.6-.3 4.5-.3 4.5c7 2.6 7.7 10.2 7.7 10.2v21.7z"
          ></path>
        </defs>
        <clipPath id="logosGithubOctocat1">
          <use href="#logosGithubOctocat0"></use>
        </clipPath>
        <path
          fill="#7DBCE7"
          d="M200.9 199.8c0 13.9-32.2 25.1-71.9 25.1s-71.9-11.3-71.9-25.1c0-13.9 32.2-25.1 71.9-25.1s71.9 11.2 71.9 25.1m0 0"
          clipPath="url(#logosGithubOctocat1)"
        ></path>
        <path
          fill="#9EDCF2"
          d="m46.9 125.9l-2.1 7.2s-.5 2.6 1.9 3.1c2.6-.1 2.4-2.5 2.2-3.2zm0 0"
        ></path>
        <path
          fill="#010101"
          d="m255.8 95.6l.2-.9c-21.1-4.2-42.7-4.3-55.8-3.7c2.1-7.7 2.8-16.7 2.8-26.6c0-14.3-5.4-25.7-14-34.3c1.5-4.9 3.5-15.8-2-29.7c0 0-9.8-3.1-32.1 11.8c-8.7-2.2-18-3.3-27.3-3.3c-10.2 0-20.5 1.3-30.2 3.9C74.4-2.9 64.3.3 64.3.3c-6.6 16.5-2.5 28.8-1.3 31.8c-7.8 8.4-12.5 19.1-12.5 32.2c0 9.9 1.1 18.8 3.9 26.5c-13.2-.5-34-.3-54.4 3.8l.2.9c20.4-4.1 41.4-4.2 54.5-3.7c.6 1.6 1.3 3.2 2 4.7c-13 .4-35.1 2.1-56.3 8.1l.3.9c21.4-6 43.7-7.6 56.6-8c7.8 14.4 23 23.8 50.2 26.7c-3.9 2.6-7.8 7-9.4 14.5c-5.3 2.5-21.9 8.7-31.9-8.5c0 0-5.6-10.2-16.3-11c0 0-10.4-.2-.7 6.5c0 0 6.9 3.3 11.7 15.6c0 0 6.3 21 36.4 14.2V177s-.6 7.7-7.7 10.2c0 0-4.2 2.9.3 4.5c0 0 19.5 1.6 19.5-14.4v-23.6s-.8-9.4 3.8-12.6v38.8s-.3 9.3-5.1 12.8c0 0-3.2 5.7 3.8 4.2c0 0 13.4-1.9 14-17.6l.3-39.3h3.2l.3 39.3c.6 15.6 14 17.6 14 17.6c7 1.6 3.8-4.2 3.8-4.2c-4.8-3.5-5.1-12.8-5.1-12.8v-38.5c4.6 3.6 3.8 12.3 3.8 12.3v23.6c0 16 19.5 14.4 19.5 14.4c4.5-1.6.3-4.5.3-4.5c-7-2.6-7.7-10.2-7.7-10.2v-31c0-12.1-5.1-18.5-10.1-21.8c29-2.9 42.9-12.2 49.3-26.8c12.7.3 35.6 1.9 57.4 8.1l.3-.9c-21.7-6.1-44.4-7.7-57.3-8.1c.6-1.5 1.1-3 1.6-4.6c13.4-.5 35.1-.5 56.3 3.7m0 0"
        ></path>
        <path
          fill="#F5CCB3"
          d="M174.6 63.7c6.2 5.7 9.9 12.5 9.9 19.8c0 34.4-25.6 35.3-57.2 35.3S70.1 114 70.1 83.5c0-7.3 3.6-14.1 9.8-19.7c10.3-9.4 27.7-4.4 47.4-4.4s37-5.1 47.3 4.3m0 0"
        ></path>
        <path
          fill="#FFF"
          d="M108.3 85.3c0 9.5-5.3 17.1-11.9 17.1s-11.9-7.7-11.9-17.1c0-9.5 5.3-17.1 11.9-17.1c6.6-.1 11.9 7.6 11.9 17.1m0 0"
        ></path>
        <path
          fill="#AF5C51"
          d="M104.5 85.5c0 6.3-3.6 11.4-7.9 11.4c-4.4 0-7.9-5.1-7.9-11.4s3.6-11.4 7.9-11.4s7.9 5.1 7.9 11.4m0 0"
        ></path>
        <path
          fill="#FFF"
          d="M172.2 85.3c0 9.5-5.3 17.1-11.9 17.1s-11.9-7.7-11.9-17.1c0-9.5 5.3-17.1 11.9-17.1c6.5-.1 11.9 7.6 11.9 17.1m0 0"
        ></path>
        <path
          fill="#AF5C51"
          d="M168.3 85.5c0 6.3-3.6 11.4-7.9 11.4c-4.4 0-7.9-5.1-7.9-11.4s3.6-11.4 7.9-11.4c4.4 0 7.9 5.1 7.9 11.4m-37.8 15c0 1.6-1.3 3-3 3c-1.6 0-3-1.3-3-3s1.3-3 3-3c1.6 0 3 1.3 3 3m-9.9 7.5c-.2-.5.1-1 .6-1.2s1 .1 1.2.6c.8 2.2 2.8 3.6 5.1 3.6s4.3-1.5 5.1-3.6c.2-.5.7-.8 1.2-.6s.8.7.6 1.2c-1 2.9-3.8 4.9-6.9 4.9s-5.9-2-6.9-4.9m0 0"
        ></path>
        <path
          fill="#C4E5D9"
          d="M54.5 121.6c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4s2.1.6 2.1 1.4m5.8 3.2c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4s2.1.6 2.1 1.4m3.5 4.2c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4c1.2-.1 2.1.6 2.1 1.4m3.2 4.8c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4c1.2-.1 2.1.6 2.1 1.4m3.5 4.4c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4s2.1.6 2.1 1.4m4.8 3.9c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4c1.2-.1 2.1.6 2.1 1.4m6.7 2.5c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4s2.1.6 2.1 1.4m6.7 0c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4s2.1.6 2.1 1.4m6.8-1.1c0 .8-.9 1.4-2.1 1.4c-1.1 0-2.1-.6-2.1-1.4s.9-1.4 2.1-1.4c1.1 0 2.1.6 2.1 1.4m0 0"
        ></path>
      </svg>
    )
}

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
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
          <Dialog.Title className="text-3xl font-extrabold tracking-tight uppercase text-center mb-6">Đăng nhập</Dialog.Title>
          <div className="flex flex-col gap-3">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start w-full h-11 py-3 rounded-md shadow border border-border bg-white dark:bg-muted font-bold text-base text-gray-800 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted/80 transition-colors duration-200"
            >
              <GoogleSVG className="w-5! h-5!" />
              <span className="flex-1">Tiếp tục với Google</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start w-full h-11 py-3 rounded-md shadow border border-border bg-white dark:bg-muted font-bold text-base text-gray-800 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted/80 transition-colors duration-200"
            >
              <FacebookSVG className="w-5! h-5!" />
              <span className="flex-1">Tiếp tục với Facebook</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start w-full h-11 py-3 rounded-md shadow border border-border bg-white dark:bg-muted font-bold text-base text-gray-800 dark:text-foreground hover:bg-gray-50 dark:hover:bg-muted/80 transition-colors duration-200"
            >
              <GithubSVG className="w-5! h-5!" />
              <span className="flex-1">Tiếp tục với Github</span>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 

  