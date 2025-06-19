'use client'
import React, {  RefObject, useEffect, useState } from 'react'
import Image from 'next/image';
import {Button} from './Button';
import Link from 'next/link';
import axios from 'axios';
import authApi from '@/lib/auth-api';
   type BanneringProps = {
  scrollRef: RefObject<HTMLDivElement | null>;
};
interface ScheduleDetailDto {
  title: string;
  description: string;
}
interface Banner {
 destination: string;
  departureLocation: string;
  transportation: string;
  image: string[]; 
  description: string;
  scheduleDetail: ScheduleDetailDto[];
  city: string;
}
const BannerImg = ({ scrollRef }: BanneringProps) =>{
const [banner, setBanner] = useState<Banner| null>(null);

useEffect (() => {
    try {
      const fetchData = async () => {
        const res = await authApi.getAllTours();
        console.log('Tour data:', res.data.postTours);
        setBanner(res.data.postTours);
      };
      fetchData();
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
}, []);
  return (
    <div 
     ref={scrollRef}
    className='col-span-3 BannerImg my-auto  w-full flex items-center h-[500px] overflow-x-auto scroll-smooth snap-x hide-scrollbar flex gap-4 2xl:px-[120px] px-[60px]'>
    {banner && Array.isArray(banner) && banner.map((item, index) => {
  return (
    <div key={index}
      className="group relative w-[347px] h-[461px] select-none cursor-pointer snap-center shrink-0 transition-all duration-300 ease-in-out transform hover:-translate-y-[15px] rounded-[26px] hover:shadow-xl/30 overflow-hidden">
      {item.image && item.image[0] && (
        <Image
          src={`http://localhost:8080${item.image[0]}`}
          alt={`Banner Image ${index + 1}`}
          width={347}
          height={461}
          className="w-full h-full object-cover rounded-[26px]"
        />
      )}
      <div className='text-white absolute inset-0 flex flex-col items-start justify-between translate-y-80 group-hover:translate-y-0 group-hover:bg-black/60 transition-transform duration-500 p-10'>
        <div className='flex flex-col '>
          <h3 className="font-bold text-[28px] font-playfair">{item.destination}</h3>
          <p className="text-[24px]">{item.city}</p>
        </div>
        <p className="text-[16px]  ">{item.description}</p>
        <div className='w-full flex gap-1'>
        {item.duration && (
            <p className="inline-block text-[14px] border rounded-[25px] px-2 py-1">
              {item.duration}
            </p>
          )}
          {item.numberOfPeople && (
            <p className="inline-block text-[14px] border rounded-[25px] px-2 py-1">
              Số khách: {item.numberOfPeople}
            </p>
          )}
         
        </div>
        <div className='flex items-center text-[26px] justify-between w-full'>
                <Link href={`/Tour/${item.id}/TourDetail`} className=''>
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
