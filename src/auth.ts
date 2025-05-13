import NextAuth, { DefaultSession} from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import {db} from "@/lib/db"
import { getUserById } from "@/data/user"

import UserRole from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks : {
    async signIn({user,account})
    {
      //If provider is not credentials, then it means that it is already verified email via other auth so directly return true.
      if(account?.provider !== "credentials")
        return true;
      const existingUser = await getUserById(user?.id);
      if(!existingUser  || !existingUser.emailVerified)
      {
        return false;
      }
      return true;
    },
    async session({session, token})
    {
      if(token.sub && session.user)
      {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
        // console.log("In session callback");
        // console.log("Session is : ",session);
        // console.log("Token from session callback is : ",token);
        return session;        
    },
    async jwt({token,user,profile})
    {
      // /*
      //  * Here in jwt callback, the sub field is same as the id of the entry saved in database of User.
      //  * mail: 'dishanew@gmail.com',
      //  *  picture: null,
      //    sub: 'clrxr6fbr0000mtf51dtu3pbh',
      //    iat: 1706547006,
      //    exp: 1709139006,
      //    jti: '84d76528-1b2f-4d58-a1ca-5111cc3e4b42'
      //    */

      if(!token.sub)
      return token;
      
      const existingUser = await getUserById(token.sub);
      // console.log("demo" , existingUser);
      if(existingUser)
      token.role = existingUser?.role;
      // console.log("In jwt callback");
      // console.log("Token is : ",token);
      // token.role = "Admin";
      //Couldn't fetch user immediately
      // console.log("User is : ",user);
      // console.log("Profile is : ",profile);
      return token;
    }
  },
  adapter : PrismaAdapter(db),
  session : {strategy : "jwt"},
  ...authConfig
})