"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECTION } from "@/routes"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields", success: undefined };
    }

    const {email, password} = validatedFields.data

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