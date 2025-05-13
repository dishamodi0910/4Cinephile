"use client"
import RoleTabs from '@/components/features/RoleTabs'
import React from 'react'
import AddNewPost from '@/components/features/admin_features/posts/AddNewPost'
import ViewPostsAdmin from '@/components/features/admin_features/posts/ViewPosts_Admin'
const PostsPage = () => {
  return (
    <div>
         <div>
          <RoleTabs role={"ADMIN"}></RoleTabs>
          </div>
          <ViewPostsAdmin/>
          <div className="flex flex-col justify-center items-center mt-4"><AddNewPost/></div>
    </div>
  )
}

export default PostsPage
