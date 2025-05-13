"use server"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EmailSchema } from "@/schemas"


const nodemailer = require("nodemailer")

async function sendEmail({email, subject, text} : z.infer<typeof EmailSchema>) {
    console.log("In Send email function");
    console.log("Email is : ",email);
    console.log("Subject is : ",subject);
    console.log("Text of email is : ",text);
    try {
        const transporter = nodemailer.createTransport({
            host : process.env.HOST,
            service : process.env.SERVICE,
            port : Number(process.env.MAIL_PORT),
            secure : Boolean(process.env.SECURE),
            auth: {
                user : process.env.USER,
                pass : process.env.PASS
            }
        })

        await transporter.sendMail({
            from : process.env.USER,
            to : email,
            subject : subject,
            text : text
        }).then(()=>{
            console.log("Email sending successful");
        }).catch(()=>{
            console.log("Couldn't send email");
        })

        console.log("Email sent successful");



    } catch (error) {
        console.log("Couldn't create nodemailer transporter");
        console.log("Error found : ",error);
    }
}
