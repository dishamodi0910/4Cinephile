import React, { Children } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card"

import FormHeader from '@/components/auth/FormHeader'
import SocialButtons from '@/components/auth/SocialButtons'
import BackButton from '@/components/auth/BackButton'

interface CardWrapperProps{
    children : React.ReactNode,
    formHeader : string,
    backButtonLabel : string,
    backButtonHref : string
    showSocial? : boolean
}
const CardWrapper = ({
    children,formHeader,backButtonLabel,backButtonHref,showSocial
} : CardWrapperProps) => {
  return (
   <Card className='w-[600px] mt-5 mb-5'>
    <CardHeader>
        <FormHeader formHeader={formHeader}></FormHeader>
    </CardHeader>
    <CardContent>
        {children}
    </CardContent>
    {/* {showSocial && (
        <CardFooter>
            <SocialButtons/>
        </CardFooter>
    )} */}
    <CardFooter>
        <BackButton backButtonLabel = {backButtonLabel} backButtonHref = {backButtonHref}></BackButton>
    </CardFooter>
   </Card>
  )
}

export default CardWrapper
