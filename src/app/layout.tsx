// "use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Toaster} from 'react-hot-toast'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SessionProviderComponent from '@/components/SessionProvider'

import "../../fonts/font_styles.css";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '4Cinephile',
  description: 'Platform for Movie Fans',
  icons : {
    icon : "/public/next.svg", 
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="content">
      <main className='mx-auto p-2'>
      <SessionProviderComponent>
        <Header/>
        {children}
        <Footer/>
      </SessionProviderComponent>
      </main>
      </body>
    </html>
  )
}
