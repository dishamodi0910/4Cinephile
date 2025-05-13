"use server"
import { db } from "@/lib/db";
export async function getVerifiedCinemas(id : string) {
    console.log("ID in fetching verified cinemas is : ", id);
    console.log("This is get verified cinemas function");
    try {
        const cinemas = await db.cinema.findMany({
            where: {
              AND: [
                { isCinemaVerified: { not: null } },
                { registeredBy: id } 
              ]
            }
          });
          
        console.log("Cinemas verified : ", cinemas);
          return cinemas;
    } catch (error) {
        console.log("Error fetching cinemas");
        throw error;
    }
   
}