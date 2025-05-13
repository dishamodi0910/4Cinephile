import * as z from "zod"

export const LoginSchema = z.object({
    email : z.string({
        invalid_type_error : "Invalid Email Format"
    }).email({
        message : "Email required!"
    }),
    password : z.string().min(1,{
        message : "Password is required!"
    })
});

export const RegisterSchema = z.object({
    email : z.string({
        invalid_type_error : "Invalid Email Format"
    }).email({
        message : "Email required!"
    }),
    password : z.string().min(6,{
        message : "Password length should be more than 6!"
    }),
    name : z.string().min(1,{
        message : "Name is Required!"
    })
});


export const ProfileSchema = z.object({
    avatar : z.string(),
    email : z.string(),
    name : z.string(),
    favourite_genre : z.string(),
    city : z.string(),
    state : z.string(),
    country : z.string()
})

export const EmailSchema = z.object({
    email : z.string(),
    subject : z.string(),
    text : z.string()
})

export const ResetSchema = z.object({
    email : z.string()
})

export const ResetPasswordSchema = z.object({
    email : z.string(),
    newpass : z.string()
})

export const CategorySchema = z.object({
    category_name : z.string(),
    category_description : z.string(),
})

export const CinemaSchema = z.object({
    name_of_cinema : z.string(),
    address_of_cinema : z.string(),
    city_of_cinema : z.string(),
    country_of_cinema : z.string(),
    tagline_of_cinema : z.string(),
    name_of_owner : z.string(),
    aadhar_number_of_owner : z.string(),
    pan_number_of_owner : z.string(),
    registered_by : z.string()
})

export const UserSchema = z.object({
    name  : z.string() || "",
    email : z.string() || "",
    emailVerified : z.date(),
    role  : z.string()
})