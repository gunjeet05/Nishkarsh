import { ID, Query } from "node-appwrite";
import { database, messaging, NEXT_PUBLIC_APPOINTMENT_KEY, NEXT_PUBLIC_DATABASE_KEY } from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { accessSync } from "fs";
import { validators } from "tailwind-merge";
import { document } from "postcss";
import { count } from "console";
import { Pending } from "@mui/icons-material";

//
type appointmentType={
    Lawyer?:string,
    schedule?:Date,
    reason?:string,
    additionalNotes?:string,
    client?:string,
    userId?:string,
    cancellationNotes?:string,
    status:'pending'|'scheduled'|'cancelled' 

}
type document={
    Lawyer:string,
    reason:string,
    $createdAt:string,
    status:string,
    $id:string
  }
export const addNewAppointment=async(appointmentData:appointmentType)=>{
    try{
        const newAppoinment=await database.createDocument(
            NEXT_PUBLIC_DATABASE_KEY!,
            NEXT_PUBLIC_APPOINTMENT_KEY!,
            ID.unique(),
            {
                ...appointmentData,

            }
        )

        if(newAppoinment){
            return JSON.parse(JSON.stringify(newAppoinment));
        }
       

    }
    catch(err){
        console.log("Error occured in adding new Appointment", err);
    }
}



export const getAppointment=async(appointmentId:string)=>{
    try{
        const appointmentdetails=await database.listDocuments( NEXT_PUBLIC_DATABASE_KEY!,
            NEXT_PUBLIC_APPOINTMENT_KEY!,
            [Query.equal('$id', appointmentId)],
        )
           console.log(JSON.parse(JSON.stringify(appointmentdetails)));
        return JSON.parse(JSON.stringify(appointmentdetails)).documents[0];


       
    }
    catch(err){
        console.log("Error occured while fetching the appointment details", err);
    }
}

export const getAppointments=async()=>{
    try{
       // console.log("here");
    const appointmentList=await database.listDocuments(
        NEXT_PUBLIC_DATABASE_KEY!,
        NEXT_PUBLIC_APPOINTMENT_KEY!,
        [Query.orderDesc('$createdAt')])
    console.log("Appointment List",appointmentList.documents.length);


        const initialData={
            pending:0,
            scheduled:0,
            cancelled:0,
        }

        const arr:document[]=JSON.parse(JSON.stringify(appointmentList.documents
        ));
        // arr.map(async(val, ind)=>{
        //     await database.deleteDocument(
        //         NEXT_PUBLIC_DATABASE_KEY!,
        //         NEXT_PUBLIC_APPOINTMENT_KEY!,
        //         val.$id

        //     )
            
        // })
        //console.log("Data from backend",arr);
        const val=arr.reduce((acc, curr,ind)=>{
            if(curr.status==='pending'){
                acc.pending++;
            }
            else if(curr.status==='scheduled'){
                acc.scheduled++;
            }
            else{
                acc.cancelled++;
            }
            return acc;
        },initialData)
        
        if(val && arr){
            revalidatePath('/admin');
            return {arr:arr, count:val};
        }
        else{
            revalidatePath('/admin');
            return {arr:[], count:initialData}
        }
       
    
        
        
        
    }
    catch(err){
        
        console.log("Error occured while fetching the appointment data", err);
        return {
            arr:[],
            count:{
                pending:0,
                scheduled:0,
                cancelled:0
            }
        }
    }
    
        
    
 

    // console.log("List of appointment new to old",JSON.parse(JSON.stringify(appointmentList)));
    
   
}; 

// getAppointments();

export const updateAppointment=async(appointmentId:string, values:appointmentType)=>{
    try{
        const updatedAppointment=await database.updateDocument(
            NEXT_PUBLIC_DATABASE_KEY!,
            NEXT_PUBLIC_APPOINTMENT_KEY!,
            appointmentId,
            values

        )
        // if(updatedAppointment){
        //     revalidatePath("/admin");
        // }
        

        return JSON.parse(JSON.stringify(updatedAppointment));
    }
    catch(err){
        console.error("Error occured in updating the appointment", err);
    }

}

export const sendMessage=async({userId, content}:{
    userId:string, content:string
})=>{
    console.log("MEssage function is called", userId);
    try{
        
        const message=await messaging.createSms(
            ID.unique(),
            content,
            [],
            ["670c034a00379fb6cdba"]
        )
    
        console.log("Message", message);
    }
    catch(err){
        console.log("Error occured while sending the message", err);
    }
   
}









