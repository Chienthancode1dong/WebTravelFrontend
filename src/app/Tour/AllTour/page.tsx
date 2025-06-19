'use client'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Banners from '../../../../public/banners'

import StarRating from '@/conponents/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => { } }: { label: string; selected?: boolean; onChange?: (checked: boolean, label: string) => void }) => {
    return (
        <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
            <input type='checkbox' checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => { } }: { label: string; selected?: boolean; onChange?: (label: string) => void }) => {
    return (
        <label className='flex items-center gap-3 cursor-pointer mt-2 text-sm'>
            <input type='radio' name='sortOption' checked={selected} onChange={() => onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}
const AllTour = () => {
  const [openFilters, setOpenFilters] = useState(false)
     const roomTypes = [
         "Phòng đơn",
         "Phòng đôi",
         "Phòng gia đình",
         "Phòng Vip"
     ]
 
     const priceRanges = [
         "Dưới 1 triệu",
         "1 triệu - 2 triệu",
         "2 triệu - 3 triệu",
         "Trên 3 triệu"
     ]
 
     const sortOptions = [
         "Giá thấp đến cao",
         "Giá cao đến thấp",
         "Mới nhất",
     ]
     return (
         <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 '>
             <div>
                 <div className='flex flex-col items-start text-left'>
                     <h1 className=' font-playfair text-4xl md:text-[40px]'>All Tour</h1>
                     <p className=' text-sm md:text-base text-gray-500/90 mt-2 max-w-174'> Mỗi phòng đều mang lại một vẻ đẹp và sự tiện nghi riêng</p>
                 </div>
                 {Banners.map((banner) => (
                    
                     <div key={banner.id || banner.name} className='xl:w-[1000px] w-[900px]  flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                         <Link href={`/Tour/${banner.id}/TourDetail`} scroll={false} className='md:w-1/2'>
                           <Image src={Array.isArray(banner.src) ? banner.src[0] : banner.src} alt="hotel-img" title='Chi tiết phòng' className='max-h-65 w-full rounded-xl shadow-lg object-cover cursor-pointer' width={400} height={260} />
                         </Link>
                         <div className='md:w-1/2 flex flex-col gap-2'>
                             <p className='text-gray-500'>{banner.location}</p>
                             <Link href={`/Tour/${banner.id}/TourDetail`} scroll={false} className='text-gray-800 text-3xl font-playfair cursor-pointer'>
                               {banner.name}
                             </Link>
                             <div className='flex items-center'>
                                  <StarRating rating={4.5} readonly />
                                
                             </div>
                             <div className='flex items-center gap-1 text-gray-500 text-sm mt-2'>
                                {banner.description}
                                
                             </div>
                             {/* Giá phòng */}
                             <p className='text-xl font-medium text-gray-700'>{banner.price}</p>
                         </div>
                     </div>
                 ))}
             </div>
             {/*Filter */}
             <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
                 <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && 'border-b'}`}>
                     <p className='text-base font-medium text-gray-800'>Bộ Lọc</p>
                     <div className='text-xs cursor-pointer'>
                         <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                             {openFilters ? 'Thu Gọn' : 'Hiển Thị'}</span>
                         <span className=' hidden lg:block'>Xóa</span>
                     </div>
                 </div>
                 <div className={`&{openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
                     <div className='px-5 pt-5'>
                         <p className='font-medium text-gray-800 pb-2 border-l-4 border-[var(--color-1)] pl-2 pt-2 bg-[var(--color-2)]/30'> Lọc theo phòng</p>
                         {roomTypes.map((room, index) => (
                             <CheckBox key={index} label={room} />
                         ))}
                     </div>
                     <div className='px-5 pt-5'>
                         <p className='font-medium text-gray-800 pb-2 border-l-4 border-[var(--color-1)] pl-2 pt-2 bg-[var(--color-2)]/30'> Lọc theo giá</p>
                         {priceRanges.map((range, index) => (
                             <CheckBox key={index} label={`${range} VND`} />
                         ))}
                     </div>
                     <div className='px-5 pt-5 pb-7'>
                         <p className='font-medium text-gray-800 pb-2 border-l-4 border-[var(--color-1)] pl-2 pt-2 bg-[var(--color-2)]/30'> Lọc theo thứ tự</p>
                         {sortOptions.map((option, index) => (
                             <RadioButton key={index} label={option} />
                         ))}
                     </div>
 
                 </div>
 
             </div>
         </div>
 
     )
 }
export default AllTour
