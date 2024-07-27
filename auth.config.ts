import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

 
export default { providers: [
    Github({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET
    }),
    Credentials({
    async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
            return null;
            }
            const { email, password } = validatedFields.data

            const user = await getUserByEmail(email)

            if (!user || !user.password) {
                return null
            }
        const passwrodMatch = await bcrypt.compare(password, user.password);
        if (passwrodMatch) return user;
    
    return null
}
})
], } satisfies NextAuthConfig