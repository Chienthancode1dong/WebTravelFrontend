import React from 'react'
interface TitleProps {
  title: string;   
  descript: string; 
  position?: string; // optional
}
const Title = (props: TitleProps) => {

  return (
    
 <div className={`text-[#000] `} >
 
  {props.position==='left' && (
    <div className=' flex flex-col items-start gap-1 z-11 absolute left-[0%] top-[0%]'>
      <h1 className='text-[54px] text-nowrap font-bold'>{props.title}</h1>
      <div className='w-[70%] h-[4px] bg-[#ff7757] mt-1'></div>
       <p>{props.descript}</p>
     </div>
  )}
   {props.position==='right' && (
    <div className=' flex flex-col items-end gap-1 z-11 absolute right-[0%] top-[0%]'>
      <h1 className='text-[54px] text-nowrap font-bold'>{props.title}</h1>
      <div className='w-[70%] h-[4px] bg-[#ff7757] mt-1'></div>
       <p>{props.descript}</p>
     </div>
  )}
</div>
  )
}

export default Title
