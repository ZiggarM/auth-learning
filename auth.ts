import NextAuth from "next-auth"
 import {PrismaAdapter} from "@auth/prisma-adapter"

 import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"



export const 
{ auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
   async linkAccount({user}){
    await db.user.update({
      where: {
        id: user.id
      },
      data: {
        emailVerified: new Date()
      }
    })
   }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if(account?.provider !== "credentials") {
      return true;
      }
      const existingUser = await getUserById(user.id);

      // Prevent sign in if email is not verified
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async session({token, session}) {
      
      if (session.user && token.sub) {
        session.user.role = token.role as UserRole
      }

      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session;
    },
    async jwt({ token}) {
      if(!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return token
      }

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})