'use client'
import React, { useState } from 'react'
import Header from '@/conponents/header'
import Image from 'next/image';
import banners from '@/../public/banners.jsx';

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // state để lưu ảnh đang chọn

  // danh sách ảnh của banner đầu tiên
const images: string[] = Array.isArray(banners[0].src)
  ? banners[0].src
  : [banners[0].src];



  return (
    <div className="w-full min-h-screen z-0 ">
      <Header opacity='' />
      <div className='w-full h-[70px]'></div>

      <div className='mt-[30px] w-full h-[1206px] grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]'>
        <div className='col-start-2 w-full h-full py-5 flex'>
          
      
          {/* Ảnh lớn */}
          <div className='2xl:w-[450px] 2xl:h-[600px] w-[360px] h-[500px]   '>
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
                className={`w-[120px] h-[120px] object-cover rounded-[26px] cursor-pointer select-none shadow-xl/30 ${
                  selectedIndex === i ? 'ring-4 ring-[#ff7757]' : ''
                }`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
          {/* thông tin */}
            <div className=' 2xl:w-[600px] w-[500px] h-[600px] rounded-[26px] flex flex-col select-none p-3 shadow-xl/30 '>
              <div className='flex flex-col '>
                <h3 className="font-bold text-[28px] font-playfair">{banners[0].name}</h3>
                <p className="text-[20px]">{banners[0].location}</p>
              </div>
            
              <div className='flex flex-col mt-5'>
                <p className="text-[16px] ">{banners[0].description}</p>
                <p className="text-[20px] ">Thời gian: {banners[0].duration}</p>
                <p className="text-[20px]  ">Số khách: {banners[0].numberOfPeople}</p>
                <p className="text-[26px] text-[#FFC107] font-normal">Giá tour: {banners[0].price}</p>
              </div>
            </div>
                {/* form chọn */}
          <div className='w-[350px]  h-full p-3 ml-5' >
              <div className='sticky top-30 h-[500px] w-full  shadow-xl/30 rounded-[26px]'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
