"use client"

import { ColumnDef, StringOrTemplateHeader } from "@tanstack/react-table"

//   id            String    @id @default(cuid())
//   name          String?
//   email         String?   @unique
//   emailVerified DateTime?
//   image         String?
//   password      String? //We keep optional as there is no password in OAuth provider.
//   role          UserRole @default(USER)

export type User = {
    name : string,
    email : String,
    emailVerified : Date | "",
    role : "USER" | "CINEMANAGER" | "ADMIN";
    image : string
}

export const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "emailVerified",
      header: "EmailVerified",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "image",
        header: "Avatar",
    },
    
    // {
    //     accessorKey : "edit_btn",
    //     header : "EditUser"
    // },
    // {
    //     accessorKey : "delete_btn",
    //     header : "DeleteUser"
    // }
  ]