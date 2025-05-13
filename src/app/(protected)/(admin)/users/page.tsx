 "use client"
 import RoleTabs from '@/components/features/RoleTabs'
 import { getAllUsers } from '@/actions/admin_features/getAllUsers'
 import DisplayUsersUsingDataTable from '@/components/features/admin_features/users/DisplayUsersUsingDataTable'
 import React, { useEffect, useState } from 'react'
 import { columns } from '@/components/features/admin_features/users/Columns'
 import { ColumnDef } from '@tanstack/react-table'
 import { Button } from '@/components/ui/button'
 import { EditUserModal } from '@/components/features/admin_features/users/EditUserModal'
 const UserPage = () => {
   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const [showModal, setShowModal] = useState(false);
   useEffect(() => {
     const fetchData = async () => {
       try {
         const userInfo = await getAllUsers();
         setUsers(userInfo);
       } catch (error) {
         console.error("Error fetching user data:", error);
       }
     }
     fetchData();
   }, [users]);
   function handleEditUser(user) {
     setSelectedUser(user);
   }
   function handleSaveUser(user) {
     setSelectedUser(null); // Clear selectedUser after saving
   }
   function handleDeleteUser(user)
   {
     console.log("In deleting user");
   }
   return (
     <div>
       <div>
         <RoleTabs role={"ADMIN"}></RoleTabs>
       </div>
       <div className='m-6'>
       <DisplayUsersUsingDataTable 
       columns={[
         ...columns,
         {
           accessorKey: "edit_btn",
           header: "Edit User",
           cell: ({ row }) =>  (
             <Button onClick={() => handleEditUser(row.original)}>Edit</Button>
           )
         },
         {
           accessorKey: "delete_btn",
           header: "Delete User",
           cell: ({ row }) =>  (
             <Button onClick={() => handleDeleteUser(row.original)} variant={'destructive'}>Delete</Button>
           )
         }
       ]}
       data={users} />
       </div>
       {showModal && selectedUser && (
         <EditUserModal user={selectedUser} onSave={handleSaveUser} onClose={() => { setShowModal(false);
           setSelectedUser(null)}} />
       )}
     </div>
   );
 }

 export default UserPage;