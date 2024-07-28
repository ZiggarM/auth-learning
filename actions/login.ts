"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECTION } from "@/routes"
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "@/data/user"
import {sendVerificationEmail} from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields", success: undefined };
    }

    const {email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Κατι κανεις λαθος"}
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Σου στειλαμε παλι email γιατι δεν λες να καταλαβεις"}
    };

    
    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECTION,
        }
    )
    return { error: undefined, success: "Login successful" };
    } catch (error) {
       if (error instanceof AuthError){
        switch (error.type) {
            case "CredentialsSignin":
                return {error: "Invalid credentials", success: undefined}
            default:
                return {error: "Something Went Wrong", success: undefined}
        }
       }
       throw error;
    };
    
}