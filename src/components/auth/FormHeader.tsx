import { cn } from '@/lib/utils'
import React from 'react'

interface HeaderProps{
    formHeader : string
}

const FormHeader = ({formHeader} : HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <span>
        <h1 className='text-5xl text-center'>🔒</h1>
      <h1 className=" text-center mb-4 font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-500">
         4Cinephile Authentication</span>
      </h1>
      </span>
      <p className='text-sm'>{formHeader}</p>
    </div>
  )
}

export default FormHeader
