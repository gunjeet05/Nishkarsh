import { ID } from "node-appwrite";
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