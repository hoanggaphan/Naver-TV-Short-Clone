import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import Github from 'next-auth/providers/github'
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Github, Google, Discord],
    callbacks: {
      async session({ session, token }: { session: Session; token: JWT }) {
        if (session.user && token?.sub) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
})