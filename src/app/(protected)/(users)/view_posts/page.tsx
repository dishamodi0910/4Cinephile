"use client"
import ViewPosts from '@/components/features/user_features/posts/ViewPosts'
import React from 'react'
import RoleTabs from '@/components/features/RoleTabs'
const page = () => {
  return (
    <div>
       <div>Admin role
          <RoleTabs role={"USER"}></RoleTabs>
          </div>
      <ViewPosts></ViewPosts>
      
    </div>
  )
}

export default page
