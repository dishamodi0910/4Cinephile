"use server"
import { db } from "@/lib/db";
import { CategorySchema } from "@/schemas";
import * as z from "zod";

export async function add_new_category(values: z.infer<typeof CategorySchema>)
{
    console.log("In server function of adding new category");
    console.log("Value of cat name : ", values.category_name);
    console.log("Value of cat desc is : ", values.category_description);

    try {

        await db.category.create({ data : {categoryname : values.category_name, category_description : values.category_description,last_edited : new Date()
        }})
        return {success: "Added new Category!"}
    }
 
    catch (error) {
        return { error : "Couldn't add new category" }
    }
    
}