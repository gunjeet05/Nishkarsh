import * as sdk from 'node-appwrite'
// export const {
//     NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
//     NEXT_PUBLIC_API_KEY: API_KEY,
//     NEXT_PUBLIC_DATABASE_KEY,
//     NEXT_PUBLIC_CLIENT_KEY,
//     NEXT_PUBLIC_LAWYER_KEY,
//     NEXT_PUBLIC_APPOINTMENT_KEY,
//     NEXT_PUBLIC_BUCKET_KEY: BUCKET_KEY,
//     NEXT_PUBLIC_PUBLIC_KEY: PUBLIC_KEY,
//   } = process.env;

  
const PROJECT_ID=process.env.NEXT_PUBLIC_PROJECT_ID;
const API_KEY=process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_DATABASE_KEY=process.env.NEXT_PUBLIC_DATABASE_KEY;
const NEXT_PUBLIC_CLIENT_KEY=process.env.NEXT_PUBLIC_CLIENT_KEY;
const NEXT_PUBLIC_LAWYER_KEY=process.env.NEXT_PUBLIC_LAWYER_KEY;

const NEXT_PUBLIC_APPOINTMENT_KEY=process.env.NEXT_PUBLIC_APPOINTMENT_KEY;
const BUCKET_KEY=process.env.NEXT_PUBLIC_BUCKET_KEY;
const PUBLIC_KEY=process.env.NEXT_PUBLIC_PUBLIC_KEY;

 export {
    PROJECT_ID, API_KEY, NEXT_PUBLIC_APPOINTMENT_KEY, NEXT_PUBLIC_DATABASE_KEY, NEXT_PUBLIC_LAWYER_KEY, NEXT_PUBLIC_CLIENT_KEY,BUCKET_KEY, PUBLIC_KEY
 }



//export const {NEXT_PROJECT_ID:PROJECT_ID, API_KEY, DATABASE_KEY, CLIENT_KEY , LAWYER_KEY, APPOINTMENT_KEY, BUCKET_KEY, NEXT_PUBLIC_KEY:PUBLIC_KEY} =process.env;

// console.log('PROJECT_ID', PROJECT_ID);
const client=new sdk.Client().setEndpoint(PUBLIC_KEY!).setKey(API_KEY!).setProject(PROJECT_ID!);

const database =new sdk.Databases(client);
const storage=new sdk.Storage(client);
const user=new sdk.Users(client);
const messaging=new sdk.Messaging(client);


export {database, storage, user, messaging};