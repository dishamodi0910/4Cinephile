"use client"
import { getUserById } from '@/data/user'; 
import  { updateUserById } from "@/actions/updateUserById";
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false); // Set initial value to false
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user) {
        const session_user = await getUserById(session.user.id);
        setName(session_user?.name || ""); // Set default value if session_user.name is undefined
        setEmail(session_user?.email || ""); // Set default value if session_user.email is undefined
        setEmailVerified(session_user?.emailVerified || false); // Set default value if session_user.emailVerified is undefined
        setRole(session_user?.role || ""); // Set default value if session_user.role is undefined
      }
    }

    fetchUser();
  }, [session]);

  const handleEdit = () => {
    setEditing(true);
    setNewName(name);
    setNewEmail(email);
  }

  const handleSave = async () => {
    await updateUserById(session?.user.id, { name: newName, email: newEmail });
    setName(newName);
    setEmail(newEmail);
    setEditing(false);
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p><strong>Name:</strong> {editing ? <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /> : name}</p>
        <p><strong>Email:</strong> {editing ? <input type="text" disabled value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /> : email}</p>
        <p><strong>Email Verified:</strong> {emailVerified ? 'Yes' : 'No'}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
      {editing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  )
}

export default Profile
