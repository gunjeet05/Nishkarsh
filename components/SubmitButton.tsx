import React from 'react'
import { Button } from './ui/button';

interface propsType{
  loading:boolean;
  children:React.ReactNode;
}
const SubmitButton = ({loading, children}:propsType) => {
  return (
    <div className='w-full bg-green-700 text-center rounded-md mt-[3rem] h-10 hover:bg-green-900'>
       <Button type="submit" className='w-full shadow-none focus-visible:ring-0  focus-visible:ring-offset-0 '>Submit</Button>
    </div>
  )
}

export default SubmitButton;
