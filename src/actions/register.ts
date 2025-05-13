"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import  bcrypt  from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/tokens";
import { sendVerificationEmail } from "@/lib/mail"

export async function register(values : z.infer<typeof RegisterSchema>)
{
    console.log("In Register action!");
    console.log("Values recieved : ",values);

    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success)
    {
        return {error : "Invalid Field Values!"}
    }
    else
    {
        const { email,password,name } = validatedFields.data;
        const hashedpassword = await bcrypt.hash(password,10);
        console.log("Hashed value of password : ",hashedpassword);
        const userWithGivenEmail = await getUserByEmail(email);
        console.log("User exists with given email : ",userWithGivenEmail);
        //Confirm if email is not taken
        if(userWithGivenEmail)
        {
            //User with given email already exists
            return { error : "Email already taken!" }
        }

        await db.user.create({
            data : {
                name,
                email,
                password : hashedpassword
            }
        })

        const verificationToken = await generateVerificationToken(email);

        console.log("Verification Token : ",verificationToken);
        await sendVerificationEmail(verificationToken.email,verificationToken.token);
        return {success: "Confirmation Email Sent"}
    }
    // return {error : "Invalid Field Values!"}
}