import clsx from 'clsx';
import React from 'react'
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

const StatusCard = ({status}:{
    
    status:'pending'|'cancelled'|'scheduled'
    
}) => {
    const capitalizeFirstChracter=(str:string):string=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  return (
    <div className={clsx('flex w-fit items-center rounded-full py-[2px] px-2 ', status==='pending' && 'bg-blue-900 bg-opaclity-40  text-blue-100 text-center',status==="cancelled"&&'bg-red-900 bg-opaclity-40  text-red-200 text-center',status==="scheduled"&&'bg-green-900 bg-opaclity-40  text-green-300 text-center' )}>
        {
            status==='pending'&& <TimelapseIcon className='p-[2px]' />
        }
        {
            status==='cancelled'&& <CloseIcon className='p-[2px]' />
        }
        {
            status==='scheduled'&& <CloseIcon className='p-[2px]' />
        }
        {capitalizeFirstChracter(status)}
    </div>
  )
}

export default StatusCard


//We can use a method to directly change some part and render it 