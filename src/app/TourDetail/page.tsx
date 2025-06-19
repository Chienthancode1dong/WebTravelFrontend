'use client'
import React, { useState } from 'react'
import Header from '@/conponents/header'
import Image from 'next/image';
import banners from '@/../public/banners.jsx';
import {Button} from '@/conponents/Button';
import StarRating from '@/conponents/StarRating';

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // state để lưu ảnh đang chọn

  // danh sách ảnh của banner đầu tiên
const images: string[] = Array.isArray(banners[0].src)
  ? banners[0].src
  : [banners[0].src];



  return (
    <div className="w-full min-h-screen z-0 relative">
      
              <div className=' fixed  2xl:right-30 right-20 top-[170px] h-[200px] w-[350px]  shadow-xl/30 rounded-[26px] flex flex-col items-center justify-center gap-2 p-5'>
                   <p className="text-[26px] text-[#FFC107] font-normal">Giá tour: {banners[0].price}</p>
                   <Button  color="orange" className='w-60 h-[35px] mx-auto' > check it now</Button>
              </div>
      
        
      <Header opacity='' />
      <div className='w-full h-[70px]'></div>

      <div className='mt-[30px] w-full h-[1206px] grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_50px]'>
      
          <div className='col-start-2 flex flex-col '>
                  <h3 className="font-bold text-[28px] font-playfair">{banners[0].name}</h3>
                  <p className="text-[20px]">{banners[0].location}</p>
                  <StarRating rating={4.5} readonly />

                </div>

        <div className='col-start-2 w-full h-full py-5 flex '>
         
      
          {/* Ảnh lớn */}
          <div className='2xl:w-[1000px] 2xl:h-900px] w-[860px] h-[500px]   '>
            <Image
              src={images[selectedIndex]}
              alt={`Main Image`}
              width={450}
              height={600}
              className="w-full h-full object-cover rounded-[26px] shadow-xl/30"
            />
          </div>

          {/* Ảnh nhỏ */}
          <div className='w-[150px] h-[600px] flex flex-col gap-3 px-3  '>
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                width={120}
                height={120}
                className={`w-[80px] h-[80px] object-cover rounded-[26px] cursor-pointer select-none shadow-xl/30 ${
                  selectedIndex === i ? 'ring-4 ring-[#ff7757]' : ''
                }`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        
                {/* form chọn */}
        
             
          
         
        </div>
           {/* thông tin */}
           <div className='col-start-2 w-full h-full py-5 flex'>
                  <div className=' 2xl:w-[600px] w-[500px] h-[600px] rounded-[26px] flex flex-col select-none p-3 shadow-xl/30 '>
               
              
                <div className='flex flex-col mt-5'>
                  <p className="text-[16px] ">{banners[0].description}</p>
                  <p className="text-[20px] ">Thời gian: {banners[0].duration}</p>
                  <p className="text-[20px]  ">Số khách: {banners[0].numberOfPeople}</p>
                 
                </div>
              </div>
           </div>
          
      </div>
    </div>
  )
}

export default Page
