"use client"

import { lawyers } from '@/constant';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
const LawyerCard = ({lawyer}:{lawyer:string}) => {
  const [ImageSrc, setImageSrc]=useState<string|null>(null);
  useEffect(()=>{
    lawyers.map((val,_)=>{
      if(val[1]===lawyer){
        setImageSrc(val[0]);
        // console.log(ImageSrc);
      }
    })
  },[])
  return (
    <div className='flex' >
        {
          ImageSrc && 
          <Image src={ImageSrc} alt='LawyerImage' height={30} width={30} className='rounded-full'/>
        }
        {lawyer}
    </div>
  )
}

export default LawyerCard
