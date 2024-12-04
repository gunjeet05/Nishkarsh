import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { type } from "os"
import React, { useState } from 'react'
import AppointMentForm from "./AppointmentForm"
import { Toys } from "@mui/icons-material"
import clsx from "clsx"
type propsType={
    type:"schedule"|"cancel",
    val:{
      userId?:string,
      $id:string
    }
}

const ActionModal = ({type, val}:propsType) => {
//  console.log("Value recieved ", val)
  const capitalize=(str:string)=>{
    return str.charAt(0).toUpperCase()+str.slice(1);
  }
  const [open, setOpen]=useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className={type==='schedule'? 'text-green-400':''}>{capitalize(type)}</DialogTrigger >
  <DialogContent className="bg-dark-200">
    <DialogHeader>
    <DialogTitle >{capitalize(type)} Appointment</DialogTitle>
    <DialogTitle className=" block text-base font-thin text-dark-700 mt-[2rem]" style={{marginTop:"2rem"}}> Fill the following form to {type} appointment</DialogTitle>
      <DialogDescription>
       {val?.userId && <AppointMentForm type={type} userId={val.userId} appointmentId={val.$id} setState={setOpen}/>}   
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default ActionModal

  
  
