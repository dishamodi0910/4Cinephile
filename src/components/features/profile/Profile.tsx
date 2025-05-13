"use client"
import React, { useEffect, useState, useTransition } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import
{
    Form,
    FormControl,
    FormMessage,
    FormItem,
    FormLabel,
    FormField,
    FormDescription
} from "@/components/ui/form"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card"

import GetSession from '@/data/GetSession'
import { ProfileSchema } from '@/schemas'
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'
import FormError from '@/components/FormError'
import FormSuccess from '@/components/FormSuccess'
import UpdateProfile from '@/actions/updateProfile'
import RoleTabs from '../RoleTabs'

// import getPropsFromSession from '@/actions/getPropsFromSession'

async function getPropsFromSession(props : string)
{
    const session = await auth();
    if(session?.user!=null){
        if(props == "email")
        return session?.user.email;
        else if(props=="name")
        return session.user.name;
        else if(props=="id")
        return session.user.id;
        else if(props=="role")
        return session.user.role;
        else if(props=="image")
        return session.user.image;
    }
    else
    {
        return null
    }
   
}

const Profile =  () => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");  
    const { data: session, status } = useSession();
    console.log("Session is : ",session);
    const [initialValues, setInitialValues] = useState({
        avatar: session?.user.image || "",
        name:session?.user.name || "",
        email:session?.user.email || "",
        favourite_genre: "",
        city: "",
        state: "",
        country: "",
      });
 const form = useForm<z.infer<typeof ProfileSchema>>(
    {
        resolver : zodResolver(ProfileSchema),
        defaultValues :  initialValues
    }
 );
 useEffect(() => {
    const fetchData = async () => {

      setInitialValues({
        avatar: session?.user.image || "",
        name: session?.user.name || "",
        email: session?.user.email || "",
        favourite_genre: "",
        city: "",
        state: "",
        country: "",
      });
    };

    fetchData();
  }, []);

 function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setError("");
    setSuccess("");
    startTransition(()=>{
      UpdateProfile(values).then((data)=>{
        setError(data.error);
        setSuccess(data.success);
      })
    })
  }

  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        {/* <RoleTabs role="USER"></RoleTabs> */}
        <h2 className="pt-5 text-center mb-1 font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500 text_heading">Time to Update your Profile!</span>⏰</h2>
      <Card className='w-[550px] mt-1 mb-5'>
        <CardHeader>
            <CardTitle>Profile Page</CardTitle>
            <CardDescription>Enhance your profile page!</CardDescription>
        </CardHeader>
        
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name='name' render={({field})=>(
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder={session?.user.name || ""} {...field} />
                        </FormControl>
                        <FormDescription>
                            Your username is wow!
                         </FormDescription>
                    </FormItem>
                )}>
                </FormField>
                <FormField control={form.control} name='email' render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder={session?.user.email || ""} {...field} disabled/>
                        </FormControl>
                    </FormItem>
                )}>
                </FormField>
                <FormField control={form.control} name='favourite_genre' render={({field})=>(
                    <FormItem>
                        <FormLabel>Enter your favourite genre</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="comedy" {...field}/>
                        </FormControl>
                    </FormItem>
                )}>
                </FormField>
                <FormField control={form.control} name='city' render={({field})=>(
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Dwarka" {...field}/>
                        </FormControl>
                    </FormItem>
                )}>
                </FormField>
                <FormField control={form.control} name='state' render={({field})=>(
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Gujarat" {...field}/>
                        </FormControl>
                    </FormItem>
                )}>
                </FormField>
                <FormField control={form.control} name='country' render={({field})=>(
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="India" {...field}/>
                        </FormControl>
                    </FormItem>
                )}>
                </FormField>
            
               
                <Button type='submit' variant={'outline_red'}>Update Details</Button>
                </form>
            </Form>
            <br/>
            <FormError message={error}/>
            <FormSuccess message={success}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile