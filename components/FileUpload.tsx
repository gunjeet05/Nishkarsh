"use client";

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Image from 'next/image'

type customPropsType={
    file:File[],
    setFile:(file:File[])=>void
}



function FileUpload(props:customPropsType) {
let fileURL="h1";
    const {file, setFile}=props;
  const onDrop = useCallback((acceptedFiles:File[]) => {
    setFile(acceptedFiles);
    fileURL=URL.createObjectURL(acceptedFiles[0]);
    console.log(fileURL , "File is selected");

    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='border border-dashed flex items-center justify-center border-dark-500 bg-dark-400 p-5 flex-col gap-2'>
      <input {...getInputProps()} />
      <div>
      {
        file.length <= 0 ?
        <FaCloudUploadAlt className='h-8 w-8' fill='green' />:

       <FaRegCheckCircle className='h-8 w-8' fill='green' />
    //    <Image src={fileURL} alt="image" height={40} width={40}
    //    />

       
      }
      </div>
      

        {
            
            file.length <= 0 ? 
              <div>
                <p>
                    <span className='text-green-700'>
                    Click to upload 
                        </span> or drag and and drop
                </p>
              </div> :
              <p className='text-green-700 '>Files has been selected</p>
          }

      
      
    </div>
  )
}


export {FileUpload}