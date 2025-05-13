"use server"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileSchema } from "@/schemas"
export default async function UpdateProfile(values : z.infer<typeof ProfileSchema>){
    console.log("In Update Profile update section!");
    console.log("Values Recieved",values);

    return {success : "Profile Update successful"};
}