import React from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import clsx from 'clsx';
type propsType={
    Icon:SvgIconComponent,
    type:string,
    count:number
}

const Cards=({Icon, type,count}:propsType)=>{
    return(
        <div className={clsx('p-3',type==='scheduled'&& 'shadow-light-shadow m-2 rounded-md bg-dark-300',
            type==='scheduled'&& 'shadow-scheduled m-2 rounded-md bg-dark-300',
             type==='cancelled'&& 'shadow-cancelled m-2 rounded-md bg-dark-300',
              type==='pending'&& 'shadow-pending m-2 rounded-md bg-dark-300'
        )}>
            <div className='flex  gap-3'>
           <Icon className={clsx('text-red', type==='pending'&&'text-blue-300',  type==='cancelled'&&'text-red-800' , type==='scheduled'&&'text-yellow-400')}/>
            {/*<Icon className='text-red-200'/>*/}
            <p className='text-xl font-semibold'>
                {count}
            </p>
           
            </div>
            <p className='mt-2'>
                Total number of {type} appointments
            </p>
            

            
        </div>
    )
}

export default Cards;



