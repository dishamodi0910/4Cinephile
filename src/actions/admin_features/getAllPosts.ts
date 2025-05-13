"use server"
import { db } from "@/lib/db";
export async function getAllPosts() {
    const allPosts = await db.post.findMany();
    return allPosts;
}