

import Image from 'next/image'
import Link from 'next/link'
import PatientForms from '@/components/PatientForm'
import { useEffect } from 'react'
import { getClient } from '@/lib/action/client.action'

type searchParam={
  params:{
    [key:string]:string
  }
}



const PatientPage=async ({params:{patientId}}:searchParam )=>{
  const client = await getClient(patientId);
  // useEffect(()=>{
    
  //   console.log(patientId, "patientID");
    
  // }, [])


  
  
  

    return (
        <div>
           <div className="flex h-screen">
      <section className="container max-h-screen pt-3 remove-scrollbar ">
       
        <div className="logo flex items-center gap-2 rounded-md">
          <Image className="h-[4rem] w-[4rem]" src={'/Images/Logo/logo5.png'} height={1000} width={1000} alt="logo" />
          <p className="text-[2.5rem] font-semibold">Nishkarsh</p>
        </div>
       <PatientForms client={client} />
        
        
        
        

        <div className="mt-[10rem]">
        <Link href="/?admin=true" className="text-green-500">Admin</Link>

        <p> © 2024 NishKarsh</p>
        </div>
        
      </section>
      <Image className='max-w-[40%] hidden md:block object-cover  ' src={'/Images/Advocate/Welcome.jpg'} height={1000} width={1000} alt="Welcome image" />
      

    </div>
        </div>
    )

}

export default PatientPage;








