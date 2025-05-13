"use server"

import { generateResetPasswordToken } from "@/data/tokens";
import { getUserByEmail } from "@/data/user"
import { sendResetPasswordMail } from "@/lib/mail";

export const PasswordResetFormLink = async(email : string) => {
    //Check if the user is in db or not,
    //If user is not registered or not verified, redirect him to login page
    const existingUser = await getUserByEmail(email);
    console.log("In password reset request : ",existingUser);
    if(!existingUser)
    {
        console.log("User doesn't exists")
        return { error : "User doesn't exists, create your account first"}
    }
    if(!existingUser?.emailVerified)
    {
        console.log("Unverified user");
        return { error : "Sorry you are not a verified user, login again to verify yourself first "}
    }
    else {
        const resetPasswordVerificationToken = await generateResetPasswordToken(email);
        console.log("Verification token added", resetPasswordVerificationToken);
        await sendResetPasswordMail(resetPasswordVerificationToken.email,resetPasswordVerificationToken.token)
        return { success : "Reset Password Link sent to your email"}
    }
}