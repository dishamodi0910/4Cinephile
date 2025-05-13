"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { signOut } from '@/auth'

import Bars2 from "@/components/icons/Bars2"
import { auth } from '@/auth'
import { useSession } from 'next-auth/react'

// function ChangeLink(status : any,userName : any)
// {
//   if (status === 'authenticated') {
//     return (
//       <>  
        
//         Hello, {userName}
//         <button
//           onClick={() => signOut()}
//           className="bg-primary rounded-full text-white px-8 py-2">
//           Logout
//         </button>
//       </>
//     );
//   }
//   if (status === 'unauthenticated') {
//     return (
//       <>
//         <Link href={'/auth/login'}>Login</Link>
//         <Link href={'/auth/register'} className="bg-primary rounded-full text-white px-8 py-2">
//           Register
//         </Link>
//       </>
//     );
//   }
// }

const Header = () => {
  // const {data : session, status} = useSession()
  // const userInfo = session?.user
  // let userName = session?.user?.name || session?.user?.email
  // const [mobileNav, setMobileNav] = useState(false);

  // if(userName && userName?.includes(' '))
  //   userName = userName.split(' ')[0];
  
  //   return (
  //   <header>
  //   <div className='flex items-center md:hidden justify-between'>
  //     <Link className='text-primary font-semibold text-3xl' href={'/'}>
  //       4Cinephile
  //     </Link>
  //     <div className='flex gap-8 items-center'>
  //       <Link href={'/'}>Ticket</Link>  
  //       <button
  //           className="p-1 border"
  //           onClick={() => setMobileNav(prev => !prev)}>
  //           <Bars2 />
  //         </button>
  //     </div>
  //   </div>
  //   {
  //     mobileNav && (
  //       <div onClick = {() => setMobileNav(false)}
  //       className='md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'>
  //         <Link href={'/'}>Home</Link>
  //         <Link href={'/'}>About Us</Link>
  //         <Link href={'/'}>Ticket</Link>
  //         <Link href={'/'}>Contact</Link>
  //         <ChangeLink status={status} userName = {userName}/>
  //       </div>
  //     )
  //   }
  //   <div className='flex items-center justify-between'>
  //     <nav className='flex items-center gap-8 text-gray-400 font-semibold'>
  //     <Link href={'/'} 
  //     className='text-primary font-semibold text-3xl'>4Cinephile</Link>
  //     <Link href={'/'}>Home</Link>
  //     <Link href={'/'}>About Us</Link>
  //     <Link href={'/'}>Ticket</Link>
  //     <Link href={'/'}>Contact</Link>
  //     </nav>
  //     <nav className="flex items-center gap-4 text-gray-500 font-semibold">
  //         <ChangeLink status={status} userName={userName} />
  //         <Link href={'/'} className="relative">
  //           Tick
  //         </Link>
  //       </nav>
  //   </div>
  //   </header>
  <div>Head</div>
  // )
}

export default Header
