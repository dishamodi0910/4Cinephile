"use client"
import React from 'react'
import { Button } from '@/components/ui/button'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn } from '@/auth'
import { signInUsingProvider } from '@/actions/signInUsingProvider'
import { DEFUALT_TO_REDIRECT_AFTER_LOGIN } from '@/routes'

const SocialButtons = () => {
  const onSignin = async (provider : "github" | "google") => {
    await signInUsingProvider(provider);
  }
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button size={"lg"} className='w-full' variant={"outline"} onClick={ ()=>{ onSignin("google")}}><FcGoogle className='h-5 w-5'/></Button>
      <Button size={"lg"} className='w-full' variant={"outline"} onClick={ ()=>{ onSignin("github")}}><FaGithub className='h-5 w-5'/></Button>
    </div>
  )
}

export default SocialButtons
