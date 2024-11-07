import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

import Link from "next/link";
import { Form } from "@/components/ui/form";



export default function Home() {
  return (
    <div className="flex h-screen">
      <section className="container  pt-3">
       
        <div className="logo flex items-center gap-2 rounded-md">
          <Image className="h-[5rem] w-[5rem]" src={'/Images/Logo/logo5.png'} height={1000} width={1000} alt="logo" />
          <p className="text-[3rem] font-semibold">Nishkarsh</p>
        </div>
        
        
        <LoginForm/>
        

        <div className="mt-[10rem]">
        <Link href="/?admin=true" className="text-green-500">Admin</Link>

        <p> © 2024 NishKarsh</p>
        </div>
        
      </section>
      <Image className='max-w-[50%] hidden md:block object-cover  ' src={'/Images/Advocate/Welcome.jpg'} height={1000} width={1000} alt="Welcome image" />
      

    </div>
    
  );
}
