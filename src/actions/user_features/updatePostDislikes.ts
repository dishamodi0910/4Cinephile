"use server"
import { db } from "@/lib/db"
export async function updatePostDislikes(post_id : any) {

    console.log("iN UPDATING DISLIKES");
    let currentExistingPost = await db.post.findFirst({where : {id : post_id}});

    let currdisLikes = currentExistingPost?.number_of_dislikes;

    const  newDisLikes = currentExistingPost?.number_of_dislikes! + 1;
    
    if(currentExistingPost)
    {
        currentExistingPost.number_of_dislikes = newDisLikes;

        await db.post.update(
            {
                where : {id : post_id},
                data : { 
                    number_of_dislikes : newDisLikes
                }
            }
        );
            return true;
    }

    return false;
}