"use server"
import { db } from "@/lib/db"
export async function getRecommendationsOfUserBasedOnId(userId:any) {
    const existingUser = await db.searchHistoryDB.findFirst({
        where : { user_id : userId}
    });

    let searched_movies = [];
    if(existingUser)
    {
        searched_movies = existingUser.movies_searched.slice(-2);
    }
    else
    {
        searched_movies = ["Sabrina (1995)", "Gladiator (2000)"];
    }

    return searched_movies;
}