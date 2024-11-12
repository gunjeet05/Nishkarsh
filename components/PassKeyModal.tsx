"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { error } from "console"

import {useRouter} from "next/navigation"

import React, { useEffect, useState } from "react"
  

const PassKeyModal = () => {
    const [isOpen , setOpen]=useState(true);
    const [password, setPassword]=useState("");
    const [err, setError]=useState("");

    const passwordEnc=(typeof window!=='undefined')?window.localStorage.getItem('passkey'):"";
    const router=useRouter();
    useEffect(()=>{
        console.log(password);
    },[password])
    useEffect(()=>{
        if(passwordEnc && (process.env.NEXT_PUBLIC_PASSKEY)===atob(passwordEnc)){
            setOpen(false);
            router.push('/admin');
        }
        else{
            setOpen(true);
        }
    },[passwordEnc])
    const handleClick=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        try{
            e.preventDefault();
           if(password &&  password===process.env.NEXT_PUBLIC_PASSKEY){
                localStorage.setItem('passkey', btoa(password));
                router.push('/admin');

           }
           else{
                setOpen(true);
                setError("Password is incorrect")
           }

        }
        catch(err){
            console.log("Error occured in appointment page", err);
        }
    }

    
  return (
    <AlertDialog  open={isOpen} onOpenChange={setOpen} >
  
  <AlertDialogContent className="bg-dark-200">
    <AlertDialogHeader>
      <AlertDialogTitle className="text-center">
       
        <p className="text-md">
            Access Verification 
        </p>
        <p className="text-sm">
            To access the admin page, enter the passkey...
        </p>
      </AlertDialogTitle>
      <AlertDialogDescription>
      <InputOTP maxLength={6} className="" value={password} onChange={(value)=>{setPassword(value);setError("")}}>
    
  <InputOTPGroup className="flex items-center justify-center ml-auto mr-auto mt-[1.5rem]">
    <InputOTPSlot index={0} className="h-[3rem] w-[3rem] " />
    <InputOTPSlot index={1} className="h-[3rem] w-[3rem] " />
    <InputOTPSlot index={2}  className="h-[3rem] w-[3rem] "/>
  
    <InputOTPSlot index={3} className="h-[3rem] w-[3rem] "/>
    <InputOTPSlot index={4} className="h-[3rem] w-[3rem] "/>
    <InputOTPSlot index={5} className="h-[3rem] w-[3rem] "/>
  </InputOTPGroup>
</InputOTP>

      </AlertDialogDescription>
    </AlertDialogHeader>
    {
        err &&
        <p className="text-center">
            {err}
            
        </p>
      }
    <AlertDialogFooter>
     
      <AlertDialogAction onClick={handleClick} className="w-full bg-green-700">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default PassKeyModal
