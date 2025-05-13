"use client"
import React from 'react'
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs'
import Profile from '@/components/features/Profile'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
// import Profile from '@/components/features/profile/Profile'
const RoleTabs = ({role}) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log("PathName : ",pathname);
  const currPath = pathname.split('/')[1];
  console.log("Current Path is : ", currPath);
  return (
    <div className='flex flex-col justify-center items-center'>
      {
        role == "USER" && (
          <Tabs defaultValue={`${currPath}`}  className='w-[1000px] justify-center items-center flex flex-col'>
          <TabsList className='grid w-full grid-cols-5'>
            <TabsTrigger value='Profile' onClick={()=>{router.push("/profile")}}>Profile</TabsTrigger>
            <TabsTrigger value='View Categories' onClick={()=>{router.push("/view_category")}}>View Categories</TabsTrigger>
            <TabsTrigger value='View Posts' onClick={()=>{router.push("/view_posts")}}>View Posts</TabsTrigger>
            <TabsTrigger value='Statistics' onClick={()=>{router.push("/statistics")}}>Stats</TabsTrigger>
            <TabsTrigger value='Search Recommendations' onClick={()=>{router.push("/abcd")}}>Get Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value='Profile'></TabsContent>
          <TabsContent value='View Categories'></TabsContent>
          <TabsContent value='View Posts'></TabsContent>
          <TabsContent value='Statistics'></TabsContent>
          <TabsContent value='Search Recommendations'></TabsContent>
         </Tabs>

      )
    }

{
        role == "ADMIN" && (
        <Tabs defaultValue={`${currPath}`}  className='w-[1400px] justify-center items-center flex flex-col'>
        <TabsList className='grid w-full grid-cols-7'>
          <TabsTrigger value='Profile' onClick={()=>{router.push("/profile")}}>Profile</TabsTrigger>
          <TabsTrigger value='Category' onClick={()=>{router.push("/category")}}>Category</TabsTrigger>
          <TabsTrigger value='Posts' onClick={()=>{router.push("/posts")}}>Posts</TabsTrigger>
          <TabsTrigger value='Recent Transactions' onClick={()=>{router.push("/transactions")}}>Recent Transactions</TabsTrigger>
          <TabsTrigger value='Users' onClick={()=>{router.push("/users")}}>Users</TabsTrigger>
          <TabsTrigger value='Statistics' onClick={()=>{router.push("/statistics")}}>Stats</TabsTrigger>
          <TabsTrigger value='Search Recommendations' onClick={()=>{router.push("/abcd")}}>Get Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value='Profile'></TabsContent>
        <TabsContent value='Category'></TabsContent>
        <TabsContent value='Posts'></TabsContent>
        <TabsContent value='Recent Transactions'></TabsContent>
        <TabsContent value='Users'></TabsContent>
        <TabsContent value='Statistics'></TabsContent>
        <TabsContent value='Search Recommendations'></TabsContent>
       </Tabs>
       
      )
    }

{
        role == "CINEMANAGER" && (
        <Tabs defaultValue={`${currPath}`}  className='w-[1000px] justify-center items-center flex flex-col'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='Profile' onClick={()=>{router.push("/profile")}}>Profile</TabsTrigger>
          <TabsTrigger value='Cinema' onClick={()=>{router.push("/registerCinema")}}>Register Your Cinema</TabsTrigger>
          <TabsTrigger value='Posts' onClick={()=>{router.push("/posts")}}>Posts</TabsTrigger>
          <TabsTrigger value='Tickets Details' onClick={()=>{router.push("/ticketsUpdate")}}>Ticket Details</TabsTrigger>
        </TabsList>
        <TabsContent value='Profile'></TabsContent>
        <TabsContent value='Cinema'></TabsContent>
        <TabsContent value='Posts'></TabsContent>
        <TabsContent value='Tickets Details'></TabsContent>
       </Tabs>
       
      )
    }

    </div>
    
    
  )
}

export default RoleTabs