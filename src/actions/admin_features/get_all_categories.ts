"use server"
import { db } from "@/lib/db";
export async function getAllCategories() {
    const allCategories = await db.category.findMany()
    return allCategories;
}