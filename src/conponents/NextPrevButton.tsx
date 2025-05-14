import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const NextPrevButton = () => {
  return (

    <div className=' h-[100px] absolute right-0 bottom-0 flex justify-between items-center gap-[40px] px-[20px] py-[28px]'> 
      <div className='w-[60px] h-[66px] bg-[#172432] rounded-[10px] flex justify-center items-center cursor-pointer'>
       <FontAwesomeIcon icon={faAngleLeft} className="text-[#fff] text-[28px] self-center" />
      </div>
      <div className='w-[60px] h-[66px] bg-[#ff7757] rounded-[10px] flex justify-center items-center cursor-pointer'>
       <FontAwesomeIcon icon={faAngleRight} className="text-[#fff] text-[28px] self-center" />
      </div>
    </div>
      
   
  )
}

export default NextPrevButton
