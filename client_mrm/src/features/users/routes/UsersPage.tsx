"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-Table";
import {columns} from "@/features/users/components/Columns"
import { getUsers } from "@/features/users/api/userApi";


export function UsersPage() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log("+++++++++")
    const fetchUsers = async () => {
      const result = await getUsers();
      console.log(result)
    }
    fetchUsers()
  },[])
  return (
    <DataTable columns={columns} data={users}/>
  )
}
