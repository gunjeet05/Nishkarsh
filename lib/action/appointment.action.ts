import { ID, Query } from "node-appwrite";
import { database, NEXT_PUBLIC_APPOINTMENT_KEY, NEXT_PUBLIC_DATABASE_KEY } from "../appwrite.config";


type appointmentType={
    Lawyer:string,
    schedule:Date,
    reason:string,
    additionalNotes?:string,
    client:string,
    userId:string,
    cancellationNotes?:string,

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