"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";

import CustomField from "./CustomField";
import { FieldType } from "./CustomField";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Rotate90DegreesCcw, SvgIconComponent } from "@mui/icons-material";

import SubmitButton from "./SubmitButton";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import { useState } from "react";
import { ClientFormSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

import { addNewUser, getClient, registerClient } from "../lib/action/client.action";


import { gender as genderArr, lawyers, idType } from "@/constant/index";
import { FormControl } from "@/components/ui/form";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import Image from "next/image";

import {FileUpload} from "../components/FileUpload"
import { BUCKET_KEY, storage } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";

// const formSchema2=z.object({
//   username:z.string().min(2, {
//     message:"Username should have atleast 2 character",

//   }).max(10, {

//   })

// })

// function onSubmit2(values:z.infer<typeof formSchema>){

// }

type clientType={
  $id:string;
  email:string;
  name:string;
  phone:string;


}

const uploadFile=async (IdentificationDocument:File[])=>{
  try{
    let uploadedFile;

        if(IdentificationDocument && IdentificationDocument.length>0){
          console.log(BUCKET_KEY, "BucketKey");
          
            uploadedFile=await storage.createFile(BUCKET_KEY!, ID.unique(),IdentificationDocument[0]);
          
          
        }
        return uploadedFile;
    

  }
  catch(err){
    console.log("Error occured in saving image to appwrite", err)
  }
      
}

const PatientForms = ({client}:{client:clientType}) => {
  //console.log(client);
  const router = useRouter();
  const [isLoading, setisLoding] = useState(false);

  async function onSubmit(values: z.infer<typeof ClientFormSchema>) {
    try{
      setisLoding(true);



      console.log("Values after submitting the form", values);
  

      const resOfImage=await uploadFile(values.IdentificationDocument);
      console.log("ImageofData", resOfImage);
    let blobData;
    let formData;
    if(values.IdentificationDocument && values.IdentificationDocument.length>0){
      blobData=new Blob([values.IdentificationDocument[0]], {
        type:values.IdentificationDocument[0].type
      })
      formData=new FormData();
      

      formData.append('blobFile', blobData);
      formData.append('fileName', values.IdentificationDocument[0]);


    }

    const {IdentificationDocument, ...rest}=values;
   // console.log("Rest of data", rest);

    const clientData={
      clientId:client.$id,
      ...rest,
      uploadedImageId:resOfImage?.$id?resOfImage.$id:undefined,
      


      
    }

    
    console.log("Data sent to action", clientData)

    const newClient=await registerClient(clientData);
    console.log("New client", newClient);

    if(newClient){
      router.push(`patient/${client.$id}/new-appointment`);
    }

    }
    catch(err){
      console.error("Error occured while  submitting e register fom", err)
    }
    finally{
      setisLoding(false);
    }
    
    

    


    

    

    
  }

  // ...
  const form = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: new Date(Date.now()),
      gender: "male",
      address: "",
      emergencyName: "",
      emergencyPhoneNumber: "",
      lawyer: "",
      caseType: "",
      caseSummary: "",
      currentStatus: "",
      IdentificationType: "",
      IdentificationDocument: [],
      IdentificationNumber: "",
      privacyConsent: false,
      occupation:""
    },
  });

  //console.log("Form in patient form", form);

  //const [loading, setLoading]=useState(false);
  // console.log("Form", form);

  return (
    <Form {...form}>
      <section className="mt-[5rem]  mb-[1rem] rremove-scrollbar">
        <h1 className="text-3xl font-medium mb-[1rem]">Welcome 👋</h1>
        {/* <h2 className="text-2xl font-medium mb-2">
          Personal Information
        </h2> */}
        <p className="text-dark-700 text-xl">Personal Information</p>
      </section>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomField
          control={form.control}
          name="name"
          type={FieldType.Input}
          placeholder="John Doe"
          label="Full Name"
          IconSrc={PersonOutlineOutlinedIcon}
        ></CustomField>
        <div className="flex justify-between flex-1 xl:flex-col gap-[4rem] xl:gap-3">
          <div className="w-full">

          
          <CustomField
            control={form.control}
            name="email"
            type={FieldType.Input}
            placeholder="john@gmail.com"
            label="Email"
            IconSrc={MarkunreadOutlinedIcon}
          ></CustomField>
          </div>
          <div className="w-full">

          
          <CustomField
            control={form.control}
            name="phone"
            type={FieldType.PhoneInput}
            placeholder="+911101101100"
            label="Phone Number"
          ></CustomField>
          </div>
        </div>
        <div>
        
        </div>
       

        <div className="flex justify-between flex-1 flex-col">
        <CustomField
            control={form.control}
            name="dob"
            type={FieldType.DatePicker}
            label="Date of Birth"
          ></CustomField>
          <CustomField
            control={form.control}
            name="gender"
            type={FieldType.Skeleton}
            label="Gender"
            renderSkeleton={(field)=>(
              <FormControl>
              <RadioGroup>
               <div className="flex gap-2">

               
                {['male', 'female', 'other'].map((val, ind) => (
                  
                     <div key={ind} className="border border-dashed  border-dark-500 rounded-md h-10 p-2 bg-dark-400 flex flex-1 items-center gap-1">
                      <RadioGroupItem value={val} id={val} key={ind} />
                      <Label htmlFor={val}>{val}</Label>
                    </div>
                 
  ))}
  </div>
              </RadioGroup>
            </FormControl>


  )}
          >


           
          </CustomField>

          <div className="flex flex-col xl:flex-col justify-between flex-1 gap-[5rem] md:flex-row xl:gap-2">
          <div className="w-full">
        <CustomField
            control={form.control}
            name="address"
            type={FieldType.Input}
            label="Address"
            
            
          >
            
          </CustomField>
          </div>
          <div className="w-full">
          <CustomField
            control={form.control}
            name="occupation"
            type={FieldType.Input}
            label="Occupation"
            
            
          >
            
          </CustomField>
          </div>
        </div>
        </div>
        <p className="text-dark-700 text-xl font-semibold mt-[3rem] mb-[1rem]">Case Related Information</p>
        <div>
          <CustomField
            control={form.control}
            name="lawyer"
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
        </div>


        <div>
        <CustomField
            control={form.control}
            name="emergencyName"
            type={FieldType.Input}
            label="Emergency Name"
          ></CustomField>
        <CustomField
            control={form.control}
            name="emergencyPhoneNumber"
            type={FieldType.PhoneInput}
            label="Emergency Phone Number"
          ></CustomField>
          
        </div>
        <div>
        <CustomField
            control={form.control}
            name="caseType"
            type={FieldType.Input}
            label="Case Type"
          ></CustomField>
          <CustomField
            control={form.control}
            name="caseSummary"
            type={FieldType.TextArea}
            label="Case Summary"
          ></CustomField>
        </div>
        <div className="">
        <CustomField
            control={form.control}
            name="caseHistory"
            type={FieldType.TextArea}
            label="Case History"
          ></CustomField>
          <CustomField
            control={form.control}
            name="currentStatus"
            type={FieldType.Input}
            label="Current Status"
          ></CustomField>
          
        </div>
        <p className="text-dark-700 text-xl font-semibold mt-[3rem] mb-[1rem]">Identification And Verification</p>
        <CustomField
            control={form.control}
            name="IdentificationType"
            type={FieldType.Skeleton}
            label="Identification Type"
            renderSkeleton={(field)=>(
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select your Identification Document..." />

                      
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-400">
                      {
                        idType.map((val, ind)=>{
                          return <div key={val+ind} className="flex items-center hover:bg-dark-500">
                              {/* <Image src={val[0]}  height={20} width={20}  alt="LawyerImage" className="rounded-full" /> */}
                              <SelectItem value={val} className="cursor-pointer h-10">
                                {
                                  val
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

          <CustomField  control={form.control}
            name="IdentificationNumber"
            type={FieldType.Input}
            label="Identification Number">
            </CustomField> 

            <CustomField 
            control={form.control}
            type={FieldType.Skeleton}
            name="IdentificationDocument"
            renderSkeleton={(field)=>(
              <FormControl>
                    <FileUpload file={field.value} setFile={field.onChange} />
              </FormControl>
              
              
            )

            }
            >

            </CustomField>
         
         
          <p className="text-dark-700 text-xl font-semibold mt-[3rem] mb-[1rem]">Privacy and consent</p>
          <CustomField
            control={form.control}
            type={FieldType.CheckBox}
            label="I state that all above data is true to my knowledge"
            name='privacyConsent'
          ></CustomField>
        




        <SubmitButton loading={isLoading}>Get Started</SubmitButton>
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
  );
};

export default PatientForms;
