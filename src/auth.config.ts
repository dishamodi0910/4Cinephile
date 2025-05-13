import Credentials from "@auth/core/providers/credentials"
import bcryptjs from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
  providers: [
    GitHub({
      clientId : process.env.GITHUB_CLIENT_ID,
      clientSecret : process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials)
      {
        const validatedFields = LoginSchema.safeParse(credentials)
        if(validatedFields.success)
        {
          const { email,password } = validatedFields.data;
          console.log("In authorize function");
          console.log("Values passed in credentials provider are : ",email,password);
          //Here after recieveing values, we check whether the user with that email exists in our database or not.

          const user = await getUserByEmail(email);
          console.log(user);
          if(!user || !user.password)
          {
            //Here we check for both user and it's password as the case can happen that user has used the OAuth provider, in that case, no password will be there.
            //Handling case : 
            //Signed in using : OAuth Provider
            //Logging in using : Credentials Provider
           console.log("Sorry there is issues in logging you in");
           console.log("User is : ", user);
           console.log("User password is : ",user?.password);
           return null;
          }

          //Compare password in form and the password in db if they match
          const passwordMatch = await bcryptjs.compare(password,user.password);
          console.log("User present in db and the logged in user matched : ",passwordMatch);

          if(passwordMatch)
          return user;

          return null
        }
      }
    })
  ],
} satisfies NextAuthConfig