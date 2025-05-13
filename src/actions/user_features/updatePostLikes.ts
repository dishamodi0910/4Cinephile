"use server"
import { db } from "@/lib/db"
export async function updatePostLikes(post_id : any) {

    console.log("In updating likes");
    let currentExistingPost = await db.post.findFirst({where : {id : post_id}});

    let currLikes = currentExistingPost?.number_of_likes;

    const  newLikes = currentExistingPost?.number_of_likes! + 1;
    
    if(currentExistingPost)
    {
        currentExistingPost.number_of_likes = newLikes;

        await db.post.update(
            {
                where : {id : post_id},
                data : { 
                    number_of_likes : newLikes
                }
            }
        );
            return true;
    }

    return false;
}