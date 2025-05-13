import { db } from "@/lib/db";

export const getUserByEmail = async(email : string) =>{
    try {
        const user = await db.user.findUnique({ where : {email}});
        return user;
    } catch (error) {
        return null;
    }
}

export const getUserById = async(id : string) =>{
    try {
        const user = await db.user.findUnique({ where : {id}});
        return user;
    } catch (error) {
        return null;
    }
}

export const getExtraUserDetailsById = async(id : string) => {
    try{
        const extraUserDetails = await db.userExtraDetails.findUnique({ where : {id}});
        return extraUserDetails;
    }
    catch(error)
    {
        return null;
    }
}

