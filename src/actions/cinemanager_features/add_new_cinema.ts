"use server"
import { getUserById } from "@/data/user";
import { sendCinemaVerificationEmail } from "@/lib/sendCinemaVerificationEmail";
import { CinemaSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export async function add_new_cinema(values : z.infer<typeof CinemaSchema>) {
    console.log("Add new cinema function executed");
    console.log(values);
    
    const getUser = await getUserById(values.registered_by);

    if (getUser && getUser.emailVerified) {
        // User is verified then only, send the email.
        const userValues = { 
            name: getUser.name || "", 
            email: getUser.email || "", 
            emailVerified: getUser.emailVerified, 
            role: getUser.role 
        };

        await sendCinemaVerificationEmail(values, userValues);

        try {
            await db.cinema.create({
               data : {
                name_of_cinema: values.name_of_cinema,
                address_of_cinema: values.address_of_cinema,
                city_of_cinema: values.city_of_cinema, 
                country_of_cinema: values.country_of_cinema,
                tagline_of_cinema: values.tagline_of_cinema,
                name_of_owner: values.name_of_owner, 
                aadhar_number_of_owner: values.aadhar_number_of_owner,
                pan_number_of_owner: values.pan_number_of_owner,
                registeredBy: values.registered_by 
               } 
            })
            return { "success" : "Your Cinema verification is under process"};
        } catch (error) {
            console.error("Error adding cinema to database:", error);
            return { "error" : "There was an error adding cinema to the database."};
        }
    } else {
        return { "error" : "User is not verified or does not exist." };
    }
}
