import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import { LuLoader2 } from "react-icons/lu";


interface propsType{
  loading:boolean;
  children:React.ReactNode;
}
const SubmitButton = ({loading, children}:propsType) => {
  return (
    <div className='w-full bg-green-700 text-center rounded-md mt-[3rem] h-10 hover:bg-green-900'>
       <Button type="submit" className='w-full shadow-none focus-visible:ring-0  focus-visible:ring-offset-0 ' disabled={loading}>
        {
         loading? <div className='flex items-center'>
          
          <LuLoader2 className='animate-spin h-8 w-8' height={24} width={24}/>
         </div>:(children)
        }

       </Button>
    </div>
  )
}

export default SubmitButton;
