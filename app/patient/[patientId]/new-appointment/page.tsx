

import AppointMentForm from '@/components/AppointmentForm'
import PatientForms from '@/components/PatientForm'
import Image from 'next/image'
import React from 'react'

type propsType={
 params:{
  patientId:string,
 }


}

const page = ({params:{patientId}}:propsType) => {
  console.log(patientId);


  return (
    <div>
       
       <div>
           <div className="flex h-screen">
      <section className="container max-h-screen pt-3 remove-scrollbar ">
       
        <div className="logo flex items-center gap-2 rounded-md">
          <Image className="h-[4rem] w-[4rem]" src={'/Images/Logo/logo5.png'} height={1000} width={1000} alt="logo" />
          <p className="text-[2.5rem] font-semibold">Nishkarsh</p>
        </div>
      <AppointMentForm type="create" userId={patientId}/>
      

        
        
        
        

        <div className="mt-[10rem]">
       

        <p> © 2024 NishKarsh</p>
        </div>
        
      </section>
      <Image className='max-w-[40%] hidden md:block object-cover  ' src={'/Images/Advocate/Welcome.jpg'} height={1000} width={1000} alt="Welcome image" />
      

    </div>
        </div>
    
    </div>
  )
}

export default page
