'use server';

import { signIn, signOut } from "@/auth";

// Server actions dùng cho form login - các action này chạy trên server
// và được sử dụng trong các form component để xử lý đăng nhập/đăng xuất

/**
 * Action đăng nhập bằng GitHub
 * Được sử dụng trong form login để xử lý OAuth với GitHub
 */
export const loginWithGithub = async () => {
    await signIn('github', { redirectTo: "/" })
}

/**
 * Action đăng nhập bằng Google
 * Được sử dụng trong form login để xử lý OAuth với Google
 */
export const loginWithGoogle = async () => {
    await signIn('google', { redirectTo: "/" })
}

/**
 * Action đăng nhập bằng Discord
 * Được sử dụng trong form login để xử lý OAuth với Discord
 */
export const loginWithDiscord = async () => {
    await signIn('discord', { redirectTo: "/" })
}

/**
 * Action đăng xuất
 * Được sử dụng trong form/logout button để xử lý đăng xuất người dùng
 */
export const logout = async () => {
    await signOut({ redirectTo: "/" })
}
