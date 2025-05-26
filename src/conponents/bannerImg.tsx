'use client'
import React, {  RefObject } from 'react'
import Image from 'next/image';
import banners from '@/../public/banners.jsx'
import {Button} from './Button';
import Link from 'next/link';

   type BanneringProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
};
const BannerImg = ({ scrollRef }: BanneringProps) =>{
 

  return (
    <div 
     ref={scrollRef}
    className='col-span-3 BannerImg my-auto  w-full flex items-center h-[500px] overflow-x-auto scroll-smooth snap-x hide-scrollbar flex gap-4 2xl:px-[120px] px-[60px]'>
    {banners.map((banner, index) => {
  const imageSrc = Array.isArray(banner.src) ? banner.src[0] : banner.src;
  return (
    <div key={index}
      className="group relative w-[347px] h-[461px] select-none cursor-pointer snap-center shrink-0 transition-all duration-300 ease-in-out transform hover:-translate-y-[15px] rounded-[26px] hover:shadow-xl/30 overflow-hidden">
      <Image
        src={imageSrc}
        alt={`Banner Image ${index + 1}`}
        width={347}
        height={461}
        className="w-full h-full object-cover rounded-[26px]"
      />
      <div className='text-white absolute inset-0 flex flex-col items-start justify-between translate-y-80 group-hover:translate-y-0 group-hover:bg-black/60 transition-transform duration-500 p-10'>
        <div className='flex flex-col '>
          <h3 className="font-bold text-[28px] font-playfair">{banner.name}</h3>
          <p className="text-[24px]">{banner.location}</p>
        </div>
        <p className="text-[16px]  ">{banner.description}</p>
        <div className='w-full flex gap-1'>
        {banner.duration && (
            <p className="inline-block text-[14px] border rounded-[25px] px-2 py-1">
              {banner.duration}
            </p>
          )}
          {banner.numberOfPeople && (
            <p className="inline-block text-[14px] border rounded-[25px] px-2 py-1">
              Số khách: {banner.numberOfPeople}
            </p>
          )}
         
        </div>
        <div className='flex items-center text-[26px] justify-between w-full'>
             <p className=" text-[#FFC107] font-normal"> {banner.price}</p>
                <Link href={`/TourDetail`}>
                   <Button color="orange" className="text-[20px] w-[100px]">Chi tiết</Button>
              </Link>
        </div>
       
      </div>
    </div>
  )
})}
   
    </div>
  )
}

export default BannerImg
