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

import { ResetSchema } from '@/schemas';

import { sendResetPasswordMail } from '@/lib/mail';
import { PasswordResetFormLink } from '@/actions/passwordResetLink';

const ResetPasswordForm = () => {

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  
  const [isPending, startTransition] = useTransition();
  const form  = useForm<z.infer<typeof ResetSchema>>({
    resolver : zodResolver(ResetSchema),
    defaultValues : {
      email : "",
    }
  })

  const handleSubmit = (values : z.infer<typeof ResetSchema>)=>{
    setError("");
    setSuccess("");
    startTransition(()=>{
      //Wait for sometime
      PasswordResetFormLink(values.email).then((data)=>{
        //Here the email link of reset will be send and promise returned
        setError(data.error)
        setSuccess(data.success)
      })
      
    })
  }

  return (
    <div>
      <CardWrapper formHeader='Reset Your Password' backButtonLabel='Back to login' backButtonHref='/auth/login' showSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <div className='space-y-4'> 
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
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button type="submit" disabled={isPending} className="w-full" variant={"outline_red"}>Send Password Reset Link</Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ResetPasswordForm
