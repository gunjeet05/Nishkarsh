

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAppointment, getAppointments } from '@/lib/action/appointment.action'
import Cards from '@/components/Cards'
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataTable } from '@/components/Table/DataTable'
import { Payment , columns} from '@/components/Table/columns'
type document={
  Lawyer:string,
  reason:string,
  $createdAt:string,
  status:string,
}
type countType={
  pending:number,
  scheduled:number,
  cancelled:number,
}
type dataType={
  arr:document[],
  count:countType,

  
}



type reducedType ={
  pending?: number;
  cancelled?: number;
  scheduled?: number;
}
// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }
const page =async() => {

  const data:dataType=await getAppointments();
  //console.log("val recieved",data );
  //fetch all the appointments
    // const [appointmentData, setAppointmentData]=useState<document[]|null>(null);
    // const [count, setCount]=useState({
    //   pending:0,
    //   scheduled:0,
    //   cancelled:0
    // })
    
  // const fetchData=async()=>{
  //   const data:dataType=await getAppointments();
  //   setAppointmentData(data.documents);
  //   // console.log(appointmentData);
  //   // console.log(data);

  // }
  // const initialData={
  //   pending:0,
  //   cancelled:0,
  //   scheduled:0,

  // }

  // useEffect(()=>{
    
  // },[appointmentData])
 


// useEffect(()=>{
//   const getDataa=async()=>{
//     setData(await getData());
//   }
//   getDataa();
// },[])

//console.log("Reduced data", reduced);
  
  //   useEffect(()=>{
  //     fetchData();
  //   },[])
    
    
    
  
  
  // useEffect(()=>{
  //   if(appointmentData){
  //     const reduced=appointmentData?.reduce((acc, curr)=>{
  //       if(curr.status==='scheduled'){
  //           acc.scheduled++;
  //       }
  //       else if(curr.status==='cancelled'){
  //         acc.cancelled++;
  //       }
  //       else{
  //         acc.pending++;
  //       }
  //       return acc;
    
  //   },initialData)

      
  //     setCount({
  //       cancelled:reduced?.cancelled?reduced.cancelled:0,
  //       scheduled:reduced?.scheduled?reduced.scheduled:0,
  //       pending:reduced?.pending?reduced.pending:0
  //     })
      
  //    // setCount(reduced);
  //   }
    
  // },[appointmentData])


  
 console.log(typeof data);

  return (
    <div className=''>
      <section className='flex items-center gap-2 mt-2 bg-black rounded-md pl-2'>
        <Image src={'/Images/Logo/logo5.png'} height={60} width={60} alt="Image"/>
        <p className='text-2xl font-semibold'>Nishkarsh</p>

      </section>
      <div className='max-w-[65rem] ml-auto mr-auto pl-2'>

      
      <section className=' '>
        <h2 className='text-2xl mt-[3rem]  font-semibold '>
          Welcome Admin
        </h2>
        <p className='mt-2'>Start day with managing new appointments!!</p>

        
      </section>
      <section className='flex flex-between mt-[2rem]'>
        <Cards type='scheduled' count={data.count.scheduled} Icon={EditCalendarIcon}></Cards>
        <Cards type='pending' count={data.count.pending} Icon={AutorenewIcon}></Cards>
        <Cards type='cancelled' count={data.count.cancelled} Icon={DeleteIcon}></Cards> 
         {/* {
          appointmentData && appointmentData?.length >0 &&
         appointmentData.map((val, ind)=>{
            return <li key={ind}>{val.$createdAt}</li>
         })

        } */}

      </section>
      <div className='p-2 mt-[3rem]'>
      <DataTable columns={columns} data={data.arr} />
      </div>
      
      
      </div>
    </div>
  )
}

export default page
