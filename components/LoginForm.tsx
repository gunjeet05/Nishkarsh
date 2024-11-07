"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import CustomField from "./CustomField"
import { FieldType } from "./CustomField"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Rotate90DegreesCcw, SvgIconComponent } from '@mui/icons-material';
 

import SubmitButton from './SubmitButton';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import { useState } from "react"
import { formSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"

import {addNewUser} from '../lib/action/client.action'

// const formSchema2=z.object({
//   username:z.string().min(2, {
//     message:"Username should have atleast 2 character",

//   }).max(10, {

//   })

// })




// function onSubmit2(values:z.infer<typeof formSchema>){
  
// }

const LoginForm=()=> {

  const router=useRouter();
  const [isLoading, setisLoding]=useState(false);
  

  async function onSubmit(values:z.infer<typeof formSchema> ) {
    setisLoding(true);
    console.log(values);
    try{
      const {username:name, email, phone}=values;
  
      const userData={name, email , phone};
  
      const newuser=await addNewUser(userData);
      if(newuser){
        router.push(`/patient/${newuser.$id}/register`);
      }
      console.log("New user created", newuser);
      
  
      
    }
    catch(err){
      console.log("Error occured", err);
    }
    finally{
      setisLoding(false);
    }
   
  
  }
   

  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      phone:""
    },
  })

  //const [loading, setLoading]=useState(false);      
  // console.log("Form", form);


  
  return (

    <Form {...form}>
      <section className="mt-[5rem]  mb-[2rem]">
        <h1 className="text-3xl font-medium mb-2">
          Hi there 👋
        </h1>
        <p className="text-dark-700">
          Schedule your first appointment!
        </p>

      </section>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomField control={form.control} name="username" type={FieldType.Input} placeholder="John Doe" label="Full Name" IconSrc={PersonOutlineOutlinedIcon} >

        </CustomField>

        <CustomField control={form.control} name="email" type={FieldType.Input} placeholder="john@gmail.com" label="Email" IconSrc={MarkunreadOutlinedIcon} >

</CustomField>

<CustomField control={form.control} name="phone" type={FieldType.PhoneInput} placeholder="+911101101100" label="Phone Number" ></CustomField>
        
        
         
    <SubmitButton loading={isLoading}>
      Get Started
      </SubmitButton>
      
      </form>
    
    </Form>

    
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //     <FormField
    //       control={form.control}
    //       name="username"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Username</FormLabel>
    //           <FormControl>
    //             <Input placeholder="shadcn" {...field} />
    //           </FormControl>
    //           <FormDescription>
    //             This is your public display name.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
  )
}

export default LoginForm;