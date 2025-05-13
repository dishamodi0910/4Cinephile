"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas";

import { signIn } from "@/auth";

import {
     DEFUALT_TO_REDIRECT_AFTER_LOGIN
} from "@/routes"
import { AuthError } from "next-auth";

import { generateVerificationToken } from "@/data/tokens";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export async function login(values : z.infer<typeof LoginSchema>)
{
    console.log("In login action!");
    console.log("Values recieved : ",values);

    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success)
    {
        return {error : "Invalid Field Values!"}
    }
    
    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    //User doesn't exist or user's email doesn't exist or user's password doesn't exist. 
    //If user's password doesn't exist, then it means that login was done using github or google, it's already verified so no need to verify email as github and google allows acc after verifying email only
    if(!existingUser || !existingUser.email || !existingUser.password)
    {
        return {error : "Email Credentials does not exist!"}
    }

    if(!existingUser.emailVerified)
    {
        const verificationToken = await generateVerificationToken(existingUser.email);
        console.log("Verification token added", verificationToken);
        await sendVerificationEmail(verificationToken.email,verificationToken.token)

        return { success : "Confirmation Email Sent!" }
    }


    try {
        const result = await signIn("credentials",{
            email,
            password,
            redirectTo: DEFUALT_TO_REDIRECT_AFTER_LOGIN,
        });
    } catch (error) {
        if(error instanceof AuthError)
        {
            switch(error.type){
                case "CredentialsSignin" : 
                    return { error : "Invalid Credentials" }
                default:
                    return {error : "Something went wrong!"}
            }
        }

        throw error;
    }
    // return {error : "Invalid Field Values!"}
}