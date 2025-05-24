import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface NextPrevButtonProps {
  onPrev: () => void;
  onNext: () => void;
  position?: string; // optional, e.g. 'left' or 'right'
}

const NextPrevButton: React.FC<NextPrevButtonProps> = ({ onPrev, onNext, position = 'right' }) => {
  return (
    <div
      className={`h-[100px] absolute ${position === 'left' ? 'left-0' : 'right-0'} bottom-0 flex justify-between items-center gap-[40px] px-[20px] py-[28px] z-10`}
    >
      <div
        onClick={onPrev}
        className='w-[60px] h-[66px] bg-[#172432] rounded-[10px] flex justify-center items-center cursor-pointer'
      >
        <FontAwesomeIcon icon={faAngleLeft} className="text-[#fff] text-[28px]" />
      </div>
      <div
        onClick={onNext}
        className='w-[60px] h-[66px] bg-[#ff7757] rounded-[10px] flex justify-center items-center cursor-pointer'
      >
        <FontAwesomeIcon icon={faAngleRight} className="text-[#fff] text-[28px]" />
      </div>
    </div>
  )
}

export default NextPrevButton
