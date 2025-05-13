"use server"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { getVerificationTokenByToken } from "@/data/verificationToken"
export const newUserEmailVerification = async(token : string) => {
    console.log("Token while user verification is : ",token);
    const existingToken = await getVerificationTokenByToken(token);
    console.log(existingToken);
    if(!existingToken)
    {
        console.log("Token is not there, thus email is not verified");
        return { error : "Token doesnot exist"};
    }

    //EXpires time is already ended. Token is expired.
    const hasExpired = new Date(existingToken.expires)  < new Date();

    if(hasExpired)
    {
        console.log("Token has expired");
        return {error : "Token has expired"};
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return { error : "User doesn't exist!" };
    }

    await db.user.update({
        where : {id : existingUser.id},
        data : {
            emailVerified : new Date(),
            email : existingToken.email
        }
    })

    // await db.verificationToken.delete({
    //     where : {id : existingToken.id}
    // })

    return { success : "Email Verified😏"};
}