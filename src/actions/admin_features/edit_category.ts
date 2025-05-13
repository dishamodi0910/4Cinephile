"use server"
import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas";
import * as z from "zod";

export async function updateCategory(cat_id : string, values : z.infer<typeof CategorySchema>)
{
    console.log("In server function of editing existing category");
    console.log("Value of cat name : ", values.category_name);
    console.log("Value of cat desc is : ", values.category_description);

    try {

        const existing_category = await db.category.findFirst({where : {id : cat_id}});
        if (existing_category) {
            await db.category.update({ 
                where: { id: cat_id },
                data: { 
                    categoryname: values.category_name,
                    category_description: values.category_description,
                    last_edited: new Date() 
                }
            });
            return { success: "Category updated successfully!" };
        } else {
            return { error: "Category not found!" };
        }
    }
 
    catch (error) {
        return { error : "Couldn't add new category" }
    }
    
}