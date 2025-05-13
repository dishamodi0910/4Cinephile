"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginBtnProps {
    children : React.ReactNode,
    mode? : "modal" | "redirect",
    asChild? : boolean
}


const LoginButton = ({children, mode="redirect", asChild} : LoginBtnProps) => {
  const router = useRouter();
  const onClickButton = () =>{
    console.log("Login Button Clicked!");
    router.push("/auth/login");
  }

  return (
    <div>
        <span onClick={ onClickButton} className='cursor-pointer'>
            {children}
        </span>
    </div>
  )
}

export default LoginButton
