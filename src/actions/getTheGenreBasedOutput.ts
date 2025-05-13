"use server"
import connectToDB from '@/lib/mongodb';
import MovieData from "@/schemas/models";
import Test from "@/schemas/test";
import test_model from "@/schemas/test";
import { NextRequest } from "next/server";

export async function getTheGenreBasedOutput() { 
    await connectToDB();

    try{
        
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate()); // Subtract 1 day
        yesterday.setHours(0);
        yesterday.setMinutes(0);
        yesterday.setSeconds(0);
        const yesterdayDateString = yesterday.toISOString().split('T')[0];

        console.log("Yesterday's date string is:", yesterdayDateString);

        const query = { "date": yesterdayDateString, "func_name": "get_movies_count_by_genre" };
        console.log("Query being executed:", query);
        const get_movies_count_by_genre = await MovieData.findOne(query).then((respo)=>{
            return respo;
        });

        console.log("Query result:", get_movies_count_by_genre);
        console.log("Upcoming data : ", get_movies_count_by_genre.data);
        return get_movies_count_by_genre;
    }
    catch(e)
    {
        console.log("error in connection ");
        console.log(e);

    }
}   