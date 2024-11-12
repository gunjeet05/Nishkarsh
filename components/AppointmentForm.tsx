"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form";
import SubmitButton from './SubmitButton';
import { useEffect, useState } from "react"
import { getSchema } from "@/lib/validation";
import CustomField from "./CustomField";
import { FieldType } from "./CustomField";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue} from "./ui/select";

import { lawyers } from "@/constant";
import Image from "next/image";
import {FormControl} from '../components/ui/form'
import { getClient, getClientData } from "@/lib/action/client.action";
import { addNewAppointment } from "@/lib/action/appointment.action";
import { useRouter } from "next/navigation";




// const formSchema2=z.object({
//   username:z.string().min(2, {
//     message:"Username should have atleast 2 character",

//   }).max(10, {

//   })

// })




// function onSubmit2(values:z.infer<typeof formSchema>){
  
// }


type propsType={
    userId:string, 
    type:"create"|"cancel"|"schedule",

}
type clientDataType={
  $id:string
}




const AppointMentForm=({userId, type,}:propsType)=> {
  const [clientData, setClientData]=useState<clientDataType|null>(null);
  useEffect(()=>{
      getClientData(userId).then((res)=>{
        setClientData(res);
      })
  },[userId])
  const formSchema=getSchema(type);
  const router=useRouter();
 
  console.log("Client data", clientData)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Lawyer: "",               
      reason: "",              
      additionalNotes: "",       
      schedule: new Date(Date.now()),
      
     
      
    },
  });
   


    

    

  
  const [isLoading, setisLoding]=useState(false);
  
  function isCreateOrScheduleSchema(schema: any): schema is { Lawyer: string; schedule: Date; reason: string; additionalNotes?: string } {
    return (schema as { Lawyer: string }).Lawyer !== undefined;
  }
  async function onSubmit(values:z.infer<typeof formSchema> ) {
    setisLoding(true);
    console.log("Values in on submit",  values);
    try{
     
      if (isCreateOrScheduleSchema(values)) {
        // Now TypeScript knows schema has a Lawyer property
        console.log("value lawyer", values.Lawyer); // Access Lawyer safely
        const appointmentData={
          Lawyer:values.Lawyer,
          schedule:new Date(values.schedule),
          reason:values.reason,
          additionalNotes:values.additionalNotes,
          client:clientData?.$id?clientData.$id:"",
          userId:userId,
          

        }
        console.log("Data to be sent", appointmentData);
        const newAppointment=await addNewAppointment(appointmentData);
        if(newAppointment){
             router.push(`new-appointment/success/?id=${newAppointment.$id}`);
        }
       // console.log("New appointment created", newAppointment.$id);
        
      } else {
        console.log("In else block");
       
      }

  
       // const appointmentData=addNewAppointment();

    }
    catch(err){
      console.log("Error occured in appointment form");
    }
    finally{
      setisLoding(false);
    }
   
  
  }
   

  // ...
  

  //const [loading, setLoading]=useState(false);      
  // console.log("Form", form);


  
  return (

    <Form {...form}>
      <section className="mt-[5rem]  mb-[2rem]">
        <h1 className="text-3xl font-medium mb-2">
          Hi there 👋
        </h1>
        <p className="text-dark-700">
          Request an appointment in 10 seconds!
        </p>

        {
            type=="create"&& (
                <>
                <CustomField
                control={form.control}
                name="Lawyer"
                type={FieldType.Skeleton}
                label="Lawyer"
                renderSkeleton={(field)=>(
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select your lawyer..." />
    
                          
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-dark-400">
                          {
                            lawyers.map((val, ind)=>{
                              return <div key={val[1]+ind} className="flex items-center hover:bg-dark-500">
                                  <Image src={val[0]}  height={20} width={20}  alt="LawyerImage" className="rounded-full" />
                                  <SelectItem value={val[1]} className="cursor-pointer h-10">
                                    {
                                      val[1]
                                    }
                                  </SelectItem>
                              </div>
                            })
                          }
                        </SelectContent>
                      
                  </Select>
    
    
      )}
              >
               
              </CustomField>
              <CustomField
              type={FieldType.TextArea}
              name="reason"
              label="Reason for appointment"
              control={form.control}

              ></CustomField>
              <CustomField
              type={FieldType.TextArea}
              name="additionalNotes"
              label="Additional Notes"
              control={form.control}

              ></CustomField>
              
              <CustomField
              type={FieldType.DatePicker}
              name="schedule"
              label="Select schedule"
              control={form.control}
              showTimeSelect
              dateFormat="Pp"


              ></CustomField>
              
            
              </>
            )
        }

      </section>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        
        
         
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

export default AppointMentForm;