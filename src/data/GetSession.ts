"use server"
import { auth } from "@/auth";
export default async function GetSession()
{
    const session = await auth();
    console.log(session);

    if(session!=null)
    return session.user;
    else
    return null;
}