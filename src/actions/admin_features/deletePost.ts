"use server"
import { db } from "@/lib/db"
export async function deletePost(post_id : any)
{
    const post = await db.post.findFirst({
        where : {id : post_id}
    });

    if(post)
    {
        await db.post.delete({
            where : {id : post_id}
        })
        return { success : "Post Deleted Successfully "};
    }
    return { error : "Couldn't delete post "};
}