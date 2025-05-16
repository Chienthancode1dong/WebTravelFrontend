'use client'
import React, {  RefObject  } from 'react'
import Image from 'next/image';
import  banners  from '@/../public/banners';

   type BanneringProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
};
const BannerImg = ({ scrollRef }: BanneringProps) =>{

  return (
    <div 
     ref={scrollRef}
    className='col-span-3 BannerImg my-auto  w-full flex h-[461px] overflow-x-auto scroll-smooth snap-x hide-scrollbar flex gap-4 2xl:px-[160px] px-[60px]'>
        {banners.map((banner,index) => (
            <div key={index} 
            className="relative w-[347px] h-full select-none cursor-pointerh-full snap-center shrink-0 ">
                <Image
                    src={banner.src}
                    alt={`Banner Image ${index + 1}`}
                 
                   className="w-full  h-full object-cover rounded-[26px]" 
                />
                <div className="absolute bottom-4 left-4 text-white  p-2 rounded">
                    <h3 className="font-bold text-[28px]  font-playfair">{banner.name}</h3>
                    <p className="text-[24px]">{banner.location}</p>
                </div>
            </div>
        ))}
   
    </div>
  )
}

export default BannerImg
