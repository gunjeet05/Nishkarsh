import { Jersey_10 } from 'next/font/google';
import {z} from 'zod';

const formSchema = z.object({
    username: z.string().min(2,"Username must be at least 2 characters."),
    email:z.string().email("Invalid email"),
    //phone:z.string()
    phone:z.string().refine((phone)=>/^\+\d{10,15}$/.test(phone), `Invalid phone number` )
  })






const ClientFormSchema=z.object({
  name:z.string().min(2, "Name should have atleast 2 character"),
  email:z.string().email("Invalid email"),
  phone:z.string().refine((phone)=>/^\+\d{10,15}$/.test(phone), `Invalid phone number`),
  dob:z.coerce.date(),
  gender:z.enum(["male", "female", "other"]),
  address:z.string().min(10, "Address should have minimum 10 length").max(100, "Maximum address length is 100"),
  occupation:z.string().min(5, "Please enter atleast 5 characters"),
  emergencyName:z.string().min(10,"Name should have length more then 5"),
  emergencyPhoneNumber:z.string().refine((phone)=>/^\+\d{10,15}$/.test(phone), `Invalid phone number` ),
  lawyer:z.string().min(2, "Please select one lawyer"),
  caseType:z.string().min(5, "Please enter atleast 5 characters"),
  caseSummary:z.string().min(5, "Please enter atleast 5 characters"),
  currentStatus:z.string().min(5, "Please enter atleast 5 characters"),
  IdentificationNumber:z.string().min(5, "Please enter atleast 5 characters"),
  IdentificationType:z.string().min(5, "Please enter atleast 5 characters"),
   IdentificationDocument:z.custom<File []>(),
  privacyConsent:z.boolean().default(false).refine((value) => value === true, {
    message: "You must consent in order to proceed",
  })
})

export {formSchema,ClientFormSchema};


const createAppointmentSchema=z.object({
  
  Lawyer:z.string().min(2, "Please select a lawyer"),
  schedule:z.coerce.date(),
  reason:z.string().min(10, "Length should be atleast 10"),
  additionalNotes:z.string().optional(),
  
  
  



  

})

const scheduleAppointmentSchema=z.object({
  Lawyer:z.string().min(2, "Please select a lawyer"),
  schedule:z.coerce.date(),
  reason:z.string().min(10, "Length should be atleast 10"),
  additionalNotes:z.string().optional()
  
})

const cancellationSchema=z.object({
  cancellationReason:z.string().min(10, "Length should be atleast 10"),
 
})


export const getSchema= (type:"create"|"cancel"|"schedule")=>{
  // switch(type){
  //     case "create":
  //       return createAppointmentSchema;
  //     case "cancel":
  //       return cancellationSchema;
  //     default:
  //       return scheduleAppointmentSchema;
  // }
  

  if(type==='create')
    {return createAppointmentSchema;}
  else if(type==='schedule'){return scheduleAppointmentSchema;}
  else{
    return cancellationSchema;
  }

  
}

