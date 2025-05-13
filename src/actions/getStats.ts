"use server"
import connectWithMongo from "@/lib/mongoConfig";
import connectToDB from '@/lib/mongodb';
import MovieData from "@/schemas/models";
import Test from "@/schemas/test";
import test_model from "@/schemas/test";
import { NextRequest } from "next/server";

export async function getStats() { 
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

        const query = { "date": yesterdayDateString, "func_name": "get_upcoming_movies" };
        console.log("Query being executed:", query);
        const get_upcoming_movies = await MovieData.findOne(query).then((respo)=>{
            return respo;
        });

        console.log("Query result:", get_upcoming_movies);
        console.log("Upcoming data : ", get_upcoming_movies.data);
        return get_upcoming_movies;
    }
    catch(e)
    {
        console.log("error in connection ");
        console.log(e);

    }
}   