'use client';

import React from 'react'
import { CiUser } from "react-icons/ci";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import {
    
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'

import { SvgIconComponent } from '@mui/icons-material';

export enum FieldType{
  Input='input',
  TextArea='textarea',
  PhoneInput="phoneInput",
  CheckBox='checkbox',
  DatePicker='datePicker',
  Select='select',
  Skeleton='skeleton'




}


interface propsType{
  control:Control<any>;
  name:string;
  type:FieldType;
  label?:string;
  disabled?:string;
  dateFormat?:string;
  showTimeSelect?:string;
  children?:React.ReactNode;
  renderSkeleton?:(field:any)=>React.ReactNode;
  placeholder?:string;
  IconSrc?:  SvgIconComponent ;
  iconAlt?:string;

}


const RenderField=({props, field}:{props:propsType, field:any})=>{
  switch(props.type){
    case FieldType.Input:
      return (
        <div className='border border-dark-500 rounded-md flex gap-0 bg-dark-400 items-center'>
         
          {props.IconSrc &&
           
          
             <props.IconSrc className=" ml-4"/>
          
          
          }
          {/* <Image src={'/Icons/user.svg'} height={24} width={24} className='ml-2' alt="User"/> */}
          <FormControl>
            <Input className='border-dark-400 bg-dark-400 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-dark-700' placeholder={props.placeholder} {...field}/>
            
          </FormControl>
        </div>
      )
    case FieldType.PhoneInput:
      return (
        
          <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder ={props.placeholder}
            
            international
            withCountryCallingCode

            value={field.value as E164Number | undefined}
            onChange={field.onChange}

            
            
            className="h-10 bg-dark-400 rounded-md pl-2 border border-dark-500 text-md placeholder:bg-dark-700"
            
          />
          
          </FormControl>


       
      )
    
    
    default:
      return null;


  }

}

// const CustomComponent:React.FC<{Component:React.ComponentType<React.SVGProps<SVGSVGElement>>}>=({Component})=>{
//   return <Component/>
// }

//this is used for returning a component ad providing the the type of props




const CustomField = (props:propsType) => {
  
  return (
    <FormField 
          control={props.control}
          name={props.name}
          render={({field})=>(
            <FormItem className='mb-5'>
              {
                props.type !==FieldType.CheckBox && props.label &&
                <FormLabel>
                {props.label}
                {/* <CustomComponent Component={props.IconSrc}/> */}
              </FormLabel>
              

              }
              {/* */}

              <RenderField props={props} field={field}/>
              <FormMessage className='text-red-500' />
            </FormItem>

             )}


             />
  )
}

export default CustomField
