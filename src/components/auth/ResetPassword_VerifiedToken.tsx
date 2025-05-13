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

import { ResetPasswordSchema } from '@/schemas';
import { resetPassword } from '@/actions/resetPassword';
import { useSearchParams } from 'next/navigation';
import { Redirect } from 'next';
import { useRouter } from 'next/navigation';

const ResetpasswordFieldForm = () => {
  const router = useRouter();
  const token = useSearchParams();
  const reset_token = token.get("reset_token");
  console.log("Reset token is : ",reset_token);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  
  const [isPending, startTransition] = useTransition();
  const form  = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver : zodResolver(ResetPasswordSchema),
    defaultValues : {
      email : "",
      newpass :"" 
    }
  })

  const handleSubmit = (values : z.infer<typeof ResetPasswordSchema>)=>{
    setError("");
    setSuccess("");
    startTransition(()=>{
      resetPassword(reset_token!,values).then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
      }).then(()=>{
        router.push("/auth/login");
      })
    })
  }

  return (
    <div>
      <CardWrapper formHeader='Enter your new password' backButtonLabel='Login here' backButtonHref='/auth/login' showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='space-y-4'> 
              <FormField control={form.control} name='newpass' render={({field})=><FormItem>
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
            <Button type="submit" disabled={isPending} className="w-full" variant={"outline_red"}>Reset Password</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ResetpasswordFieldForm
