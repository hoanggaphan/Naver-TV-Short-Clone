import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import Github from 'next-auth/providers/github'
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Github, Google, Discord],
})