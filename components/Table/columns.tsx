"use client"

import { ColumnDef } from "@tanstack/react-table"
import NewComponent from "../NewComponent"
import LawyerCard from "../LawyerCard"
import StatusCard from "../StatusCard"
import ActionModal from "../ActonModal"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type clientType={
  name:string,
}
export type Payment = {
  client?:{
    name:string
  },
  Lawyer:string,
  reason:string,
  schedule:Date,
  status?:'cancelled'|'pending'|'scheduled',
  userId:string,
  $id:string
}

export const columns: ColumnDef<Payment>[] = [
  {
    header:'Patient',
    accessorKey:'client',
    cell:(({row})=>{
      return <div key={row.id}>
        <NewComponent data={row.original} key={row.id}/>
        
      </div>

    })
  },
  {
    header:'Lawyer',
    accessorKey:'Lawyer',
    cell:({row})=>{
      return (
        <>
          <LawyerCard lawyer={row.original.Lawyer} />
        </>
      )
    }
  },
  {
    header:'Date',
    accessorKey:'Date',
    cell:({row})=>{
      return (
        <div>
          
          {row.original.schedule?new Date(row.original.schedule).toLocaleDateString("en-us", {
            day:"numeric",
            month:"short",
            year:"numeric",
            hour:"numeric",
            minute:"numeric",
            hour12:true,
            second:"numeric",
            timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone

          }):"Date not avaialble"}
        </div>
      )
    }
  },
  {
    header:'Status',
    accessorKey:'status',
    cell:({row})=>{
      
        return <div>
          {row.original.status?<StatusCard status={row.original.status}/>:"No status"}
        </div>
    }
  },
  {
    id:'action',
    header:()=><div>Action</div>,
    cell:({row})=>{
      return (
        <div className="flex gap-2">
          <ActionModal type="schedule" val={row.original} />
          <ActionModal type="cancel" val={row.original} />
          {/* <ActionModal type="cancel" /> */}
        </div>
      )
    }
  }
]