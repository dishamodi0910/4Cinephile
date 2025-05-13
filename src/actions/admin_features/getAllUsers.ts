"use server"
import { db } from "@/lib/db"
export async function getAllUsers(){
    const getUsers = await db.user.findMany();
    return getUsers;
}