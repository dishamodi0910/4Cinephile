
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import RoleTabs from '@/components/features/RoleTabs';
import  {auth} from "@/auth"
import DisplayRecommendationsBasedOnHistory from '@/components/DisplayRecommendationsBasedOnHistory';

const DemoPage = async () => {
  const session = await auth();
  let user_role = "USER" ;
  user_role = "ADMIN";
  user_role = "CINEMANAGER"
  user_role = "USER"
  user_role = session?.user.role!;
  return (
    <>
    
    <div>
      {
        user_role == "USER" && 
        (
          <div>
            <RoleTabs role={user_role}></RoleTabs>
          </div>
          
        )
      }
      {
        user_role == "ADMIN" && 
        (
          <div>
          <RoleTabs role={user_role}></RoleTabs>
          </div>
        )
      }
      {
        user_role == "CINEMANAGER" && 
        (
          <div>
          <RoleTabs role={user_role}></RoleTabs>
          </div>
        )
      }
    </div>

    <DisplayRecommendationsBasedOnHistory></DisplayRecommendationsBasedOnHistory>
    </>
  )
}

export default DemoPage
