"use server"

//import { ID,InputFile,  Query} from 'node-appwrite';
import { ID, Query } from "node-appwrite";

import {user, NEXT_PUBLIC_LAWYER_KEY, storage, BUCKET_KEY, database, NEXT_PUBLIC_DATABASE_KEY, NEXT_PUBLIC_CLIENT_KEY, PUBLIC_KEY, PROJECT_ID} from '../appwrite.config'
// import { json } from "stream/consumers";

const addNewUser=async (users:CreateUserParams)=>{
   // console.log("PROCESS.ENV2",NEXT_PUBLIC_LAWYER_KEY);
    try{
        const newUser=await user.create(
            ID.unique(),
            users.email,
            users.phone,
            undefined,
            users.name 

        )

        return newUser;
        

        

    }
    catch(err:any){
        console.log("Error in adding new user", err);
        if(err && err?.code===409){
            
            const existing=(await user.list([Query.equal('email', users.email)]));
            console.log("user already exist", existing)
            // console.log(users.email,existing[1].email);
            // const existingUSer=existing.filter((val)=>val.email===users.email || val.phone===users.phone)
            
            return existing.users[0];

            
           



        }

    }
}

export const getClient=async(clientId:string)=>{
    
    try{
        const client=await user.get(clientId);
        console.log("Client data in backend", JSON.parse(JSON.stringify(client)));
        return JSON.parse(JSON.stringify(client))
        
    }catch(err){
        console.log("Error occured while getting the user", err);
    }
   

}

interface clientData{
    clientId:string;
    name:string;
    phone:string;
    email:string;
    dob:Date;
    gender:'male'|'female'|'other';
    occupation:string;
    emergencyName:string;
    emergencyPhoneNumber:string;
    lawyer:string;
    
    privacyConsent:boolean;
    
    IdentificationType:string;
    IdentificationNumber:string;
    address:string;
    caseSummary:string;
    
    caseType:string;
    currentStatus:string|undefined;
    uploadedImageId?:string|undefined;




}


export const registerClient=async(clientData:clientData)=>{

    try{
        let uploadedFile;

        const {uploadedImageId, ...rest}=clientData;
        console.log(rest);

    
        const client=await database.createDocument(
            NEXT_PUBLIC_DATABASE_KEY!,
            NEXT_PUBLIC_CLIENT_KEY!,
            ID.unique(),{
                ...rest,
                IdentificationDocumentID:clientData.uploadedImageId?clientData.uploadedImageId:null,
                IdentificationUrl:clientData.uploadedImageId?
                `${PUBLIC_KEY}/storage/buckets/${BUCKET_KEY}/files/${clientData.uploadedImageId}/view??project=${PROJECT_ID}`
                : null,
            
    
    
            }
    
    
        )
        if(client){
            return JSON.parse(JSON.stringify(client));

        }
        
       
        

    }
    catch(err){
        console.log("Error occured while creating new client", err);
    }
   
    



}


export const getClientData=async(userId:string)=>{
    console.log("Method is called", userId);
    try{
        const clientData=await database.listDocuments(
            NEXT_PUBLIC_DATABASE_KEY!,
            NEXT_PUBLIC_CLIENT_KEY!,
            [Query.equal('clientId',userId)]

        )

        if(clientData){
            console.log(JSON.parse(JSON.stringify(clientData)))
            return JSON.parse(JSON.stringify(clientData));

        }

    }
    catch(err){

            console.log("Error occured while fetching the client data", err);
            
    }


}


export {addNewUser};