import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { getResetPasswordTokenByEmail } from "./resetPassToken";

export async function generateVerificationToken(email : string) {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getVerificationTokenByEmail(email);
    
    if(existingToken)
    {
        db.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        });
    }

    const verificationToken = db.verificationToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}


export async function generateResetPasswordToken(email : string) {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getResetPasswordTokenByEmail(email);
    
    if(existingToken)
    {
        db.resetPasswordToken.delete({
            where : {
                id : existingToken.id
            }
        });
    }

    const resetPasswordToken = db.resetPasswordToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return resetPasswordToken;
}

