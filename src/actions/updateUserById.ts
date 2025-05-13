"use server"

import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
export async function  updateUserById(user_id, { name, email})
{
    const existingUser = await db.user.findFirst({
        where : { id : user_id}
    })
    await db.user.update({
        where : { id : user_id},
        data : { name : name}
    });
    
}