import { db } from "@/lib/db"

export const getResetPasswordTokenByEmail = async(email : string) => {
    try {
        
        const resetPassToken = await db.resetPasswordToken.findFirst({
            where : { email }
        })
        return resetPassToken;
    } catch (error : any) {
        console.log("Error is : ",error.message);
        return null;
    }
}

export const getResetPasswordTokenByToken = async(token : string) => {
    try {
        const resetPasswordToken = await db.resetPasswordToken.findUnique({
            where : {token}
        })
        return resetPasswordToken;
    } catch (error : any) {
        console.log("Error is : ",error.message);
        return null;
    }
}