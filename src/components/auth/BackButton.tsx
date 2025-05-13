"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BackButtonProps{
    backButtonLabel : string,
    backButtonHref : string
}

const BackButton = ({backButtonLabel,backButtonHref} : BackButtonProps) => {
  return (
    <Button variant={"outlined_red_link"} className='w-full flex flex-col gap-y-4 items-center justify-center content'>
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  )
}

export default BackButton
