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

import { LoginSchema } from '@/schemas';

import { login } from '@/actions/login';
import Link from 'next/link';


const LoginForm = () => {

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  
  const [isPending, startTransition] = useTransition();
  const form  = useForm<z.infer<typeof LoginSchema>>({
    resolver : zodResolver(LoginSchema),
    defaultValues : {
      email : "",
      password :"" 
    }
  })

  const handleSubmit = (values : z.infer<typeof LoginSchema>)=>{
    setError("");
    setSuccess("");
    startTransition(()=>{
      login(values).then((data)=>{
        setError(data.error);
        setSuccess(data.success);
      })
    })
  }

  return (
    <div>
      <CardWrapper formHeader='Welcome Back' backButtonLabel='No account?' backButtonHref='/auth/register' showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='space-y-6'> 
              <FormField control={form.control} name='email' render={({field})=><FormItem>
                <FormLabel className='input_label'>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder='test@example.com' type='email' ></Input>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }>

              </FormField>
            </div>
            <div className='space-y-6'> 
              <FormField control={form.control} name='password' render={({field})=><FormItem>
                <FormLabel className='input_label'>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder='******' type='password'></Input>
                </FormControl>
                <Button size="sm" variant={"outlined_red_link"} asChild className='px-0 font-normal'><Link href="/auth/reset-password" ><p className='input_label input_box'>Forgot Password?</p></Link></Button>
                <FormMessage/>
              </FormItem>
            }>

              </FormField>
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" disabled={isPending} className="w-full" variant={"outline_red"}>Login</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default LoginForm
