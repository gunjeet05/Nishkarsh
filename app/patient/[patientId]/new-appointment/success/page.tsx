

import Image from 'next/image'
import { CiCircleCheck } from "react-icons/ci";
import React, { useEffect } from 'react'
import { getAppointment } from '@/lib/action/appointment.action';
import { lawyers } from '@/constant';
type searchParamType={
  params:{
    patientId:string,
  },
  searchParams:{
    id:string,
  }
}

type appointmentType={
  Lawyer:string,
  schedule:Date,
}

const page = async (searchParams:searchParamType) => {
  

  const appointmentDetails:appointmentType=await getAppointment(searchParams.searchParams.id);
  let imgSrc;
 // console.log(appointmentDetails.Lawyer);
  lawyers.forEach((val)=>{
    console.log(val[1]);
    
    if(val[1]===appointmentDetails.Lawyer!){
      imgSrc=val[0];
    }
  })

  const formatDateTime = (dateString: Date | string, timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      
      // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
      month: "short", // abbreviated month name (e.g., 'Oct')
      day: "numeric", // numeric day of the month (e.g., '25')
      year: "numeric", // numeric year (e.g., '2023')
      hour: "numeric", // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
      timeZone: timeZone, // use the provided timezone
    };
  
    const dateDayOptions: Intl.DateTimeFormatOptions = {
      weekday: "short", // abbreviated weekday name (e.g., 'Mon')
      year: "numeric", // numeric year (e.g., '2023')
      month: "2-digit", // abbreviated month name (e.g., 'Oct')
      day: "2-digit", // numeric day of the month (e.g., '25')
      timeZone: timeZone, // use the provided timezone
    };
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short", // abbreviated month name (e.g., 'Oct')
      year: "numeric", // numeric year (e.g., '2023')
      day: "numeric", // numeric day of the month (e.g., '25')
      timeZone: timeZone, // use the provided timezone
    };
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric", // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
      timeZone: timeZone, // use the provided timezone
    };
  
    const formattedDateTime: string = new Date(dateString).toLocaleString(
      "en-US",
      dateTimeOptions
    );
  
    const formattedDateDay: string = new Date(dateString).toLocaleString(
      "en-US",
      dateDayOptions
    );
  
    const formattedDate: string = new Date(dateString).toLocaleString(
      "en-US",
      dateOptions
    );
  
    const formattedTime: string = new Date(dateString).toLocaleString(
      "en-US",
      timeOptions
    );
  
    return {
      dateTime: formattedDateTime,
      dateDay: formattedDateDay,
      dateOnly: formattedDate,
      timeOnly: formattedTime,
    };
  };
  console.log(imgSrc);
  return (
    

    <div>

        <div className='container remove-scrollbar'>
         <div className="logo flex items-center gap-2 rounded-md  justify-center mt-5">
          <Image className="h-[4rem] w-[4rem]" src={'/Images/Logo/logo5.png'} height={1000} width={1000} alt="logo" />
          <p className="text-[2.5rem] font-semibold">Nishkarsh</p>
         
          </div>
          <div className='flex justify-center mt-[5rem] flex-col items-center gap-3'>
            <CiCircleCheck height={100} width={100} className='h-[3rem] w-[5rem]' fill='#66b366' />
            <div className='w-7/12'>
                <h1 className='text-3xl text-center leading-[3rem]'>
                    Your <span className='text-[#66b366]'>appointment request</span> has been successfully submitted!
                </h1>
                <p className='text-center mt-4'>We will be in touch Shortly to compare!!</p>
                <div className='flex items-center gap-3 mt-[2rem] border-y py-2 border-dark-400'>
                    <p>Appointment Detail</p>
                    <Image
                      src={imgSrc!}
                      height={40}
                      width={40}
                      alt="Lawyer image"
                      className='rounded-full'
                    ></Image> 
                    <p>
                      Lawyer: {appointmentDetails.Lawyer}
                    </p>
                    <p>Schedule:{formatDateTime(appointmentDetails.schedule).dateTime} </p>
                </div>
            </div>
          </div>
          </div>
        
    </div>
  )
}

export default page
