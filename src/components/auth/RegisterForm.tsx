"use client"

import React, { useState } from 'react'
import * as z from"zod"
import { useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"


import CardWrapper from "@/components/auth/CardWrapper"
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
  FormItem
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import  FormError  from '@/components/FormError';
import  FormSuccess  from '@/components/FormSuccess';

import { RegisterSchema } from '@/schemas';

import { register } from '@/actions/register';


const RegisterForm = () => {

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  
  const [isPending, startTransition] = useTransition();
  const form  = useForm<z.infer<typeof RegisterSchema>>({
    resolver : zodResolver(RegisterSchema),
    defaultValues : {
      email : "",
      password :"" ,
      name : ""
    }
  })

  const handleSubmit = (values : z.infer<typeof RegisterSchema>)=>{
    setError("");
    setSuccess("");
    startTransition(()=>{
      register(values).then((data)=>{
        setError(data.error);
        setSuccess(data.success);
      })
    })
  }

  return (
    <div className='pb-5'>
      <CardWrapper formHeader='Create An Account!😃' backButtonLabel='Already have an account?' backButtonHref='/auth/login' showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <div className='space-y-2'> 
              <FormField control={form.control} name='name' render={({field})=><FormItem>
                <FormLabel className='input_label'>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder='Hello World'></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }>

              </FormField>
            </div>
            <div className='space-y-2'> 
              <FormField control={form.control} name='email' render={({field})=><FormItem>
                <FormLabel className='input_label'>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder='test@example.com' type='email'></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }>

              </FormField>
            </div>
            <div className='space-y-2'> 
              <FormField control={form.control} name='password' render={({field})=><FormItem>
                <FormLabel className='input_label'>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder='******' type='password'></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }>

              </FormField>
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" disabled={isPending} className="w-full" variant={"outline_red"}>Create Account</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default RegisterForm
