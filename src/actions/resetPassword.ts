"use server"
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt"
import { getResetPasswordTokenByToken } from "@/data/resetPassToken";
import { auth } from "@/auth";

export const resetPassword = async(token : string,password : z.infer<typeof ResetPasswordSchema>) => {
    //You come here means you have verified reset password token, so only work with passwords, no need of email anymore
    //Need to verify email for particular user.
    console.log("Token while user reset password is : ",token);
    const existingToken = await getResetPasswordTokenByToken(token);
    console.log(existingToken);
    if(!existingToken)
    {
        console.log("Token is not there, thus password can't be reset");
        return { error : "Token doesnot exist"};
    }

    //EXpires time is already ended. Token is expired.
    const hasExpired = new Date(existingToken.expires)  < new Date();

    if(hasExpired)
    {
        console.log("Token has expired");
        return {error : "Token has expired, re do the procedure"};
    }
    //Let's bring email here from session
    const email = existingToken.email;
    const newpass = password.newpass;
    //here you need to update pass
    console.log("In reset password");
    console.log("Email : ", email);
    const existingUser = await getUserByEmail(email!);
    if(!existingUser)
    {
        return { error : "Create your account first!" }
    }
    const hashedpassword = await bcrypt.hash(newpass,10);
    console.log("Hashed value of password : ",hashedpassword);
    //Hashed one store directly by email, no other verification needed

    await db.user.update({
        where : {
            email : email!
        },
        data : {
            password : hashedpassword
        }
    }).then(()=>{
        console.log("Yes the password is updated")
    }).catch((error)=>{
        console.log(error.message);
        console.log("Password Couldn't be updated")
    })

    return { success : "Password updated!😄"}
}