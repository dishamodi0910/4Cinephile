"use server"
import { db } from "@/lib/db";
export async function savePostDetailsInDb(post_title : any, post_image : any, post_description : any, adminEmail : any)
{   
    try {
        const response = await db.post.create({
            data : {
                createdAt : new Date(),
                post_title : post_title,
                post_image_url : post_image,
                post_url : "",
                post_description : post_description,
                publisher_email : adminEmail,
                categories : "",
                number_of_likes : 0,
                number_of_dislikes : 0
            }
        });

        if(response)
        {
            return {success : "Post Added Successfully"};
        }
        else
        {
            return {error : "Issue in adding post"};
        }
        
    } catch (error : any) {
        return {error : error.message};
    }
    
    return { success : "Post added"};
}