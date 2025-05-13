import Profile from '@/components/features/profile/Profile'
import RoleTabs from '@/components/features/RoleTabs'
import React from 'react'

const ProfilePage = () => {
  return (
    <div>
         <div>
          <RoleTabs role={"ADMIN"}></RoleTabs>
          </div>
      <Profile></Profile>
    </div>
  )
}

export default ProfilePage
