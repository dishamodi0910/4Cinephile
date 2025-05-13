import { CinemaSchema, UserSchema } from "@/schemas";
import { Resend } from "resend"
import { z } from "zod";

const resend  = new Resend("re_CNTjFHf8_F6kMYF8QqcyCLjKj3iCJx7gy");

export const sendCinemaVerificationEmail = async(values : z.infer<typeof CinemaSchema>, userValues : z.infer<typeof UserSchema>) =>  {
    //Admin Email here as admin will verify it.
    const adminEmail = "dishamodi3105@gmail.com";
    const cinemaDetails = `
    <h2>Cinema Details:</h2>
    <p><strong>Name of Cinema:</strong> ${values.name_of_cinema}</p>
    <p><strong>Address:</strong> ${values.address_of_cinema}, ${values.city_of_cinema}, ${values.country_of_cinema}</p>
    <p><strong>Tagline:</strong> ${values.tagline_of_cinema}</p>
    <br>
    <h2>Owner Details:</h2>
    <p><strong>Name of Owner:</strong> ${values.name_of_owner}</p>
    <p><strong>Aadhar Number:</strong> ${values.aadhar_number_of_owner}</p>
    <p><strong>PAN Number:</strong> ${values.pan_number_of_owner}</p>`;

    const userDetails = `
    <h2>User Details:</h2>
    <p><strong>Name:</strong> ${userValues.name}</p>
    <p><strong>Email:</strong> ${userValues.email}</p>
    <p><strong>Role:</strong> ${userValues.role}</p>`;

    const htmlMessage = `
    <p>Hello Admin,</p>
    <p>A new cinema registration requires verification.</p>
    ${cinemaDetails}
    <br>
    ${userDetails}
    <br>
    <p>Please verify the details and take necessary actions.</p>
    <p>Regards,<br>4Cinephile Team</p>`;

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : adminEmail,
        subject : "Verify New Cinema Registration @4Cinephile",
        html : htmlMessage
    })
}
