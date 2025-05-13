"use server"
import { db } from "@/lib/db";
export async function addMovieInSearchHistory(userId : any, searchQuery : any) {
  try {
    const existingSearchHistory = await db.searchHistoryDB.findFirst({
      where: {
        user_id: userId
      }
    });
    if (existingSearchHistory) {
      await db.searchHistoryDB.update({
        where: {
          id: existingSearchHistory.id
        },
        data: {
          movies_searched: [...existingSearchHistory.movies_searched, searchQuery]
        }
      });
    } 
    else {
      await db.searchHistoryDB.create({
        data: {
          user_id: userId,
          movies_searched: [searchQuery]
        }
      });
    }

    return { success: "Movie search added to db" };
  } 
  catch (error) {
    console.error('Error adding search query:', error);
    return { error : "Error in adding entry to search Database"};
  }
}
