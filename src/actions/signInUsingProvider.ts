"use server"
import { signIn } from "@/auth";
import { DEFUALT_TO_REDIRECT_AFTER_LOGIN } from "@/routes";

export async function signInUsingProvider(provider : "github" | "google")
{
    await signIn(provider);
}