'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import banners from '@/../public/banners.jsx';
import {Button} from '@/conponents/Button';
import StarRating from '@/conponents/StarRating';
import {Clock,UsersRound,Bus } from 'lucide-react'

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // state để lưu ảnh đang chọn

  // danh sách ảnh của banner đầu tiên
const images: string[] = Array.isArray(banners[0].src)
  ? banners[0].src
  : [banners[0].src];

// Dữ liệu mẫu cho lịch trình tour
const availableTours = [
  { date: '2025-07-01', seats: 10, price: '5,000,000 VND' },
  { date: '2025-07-15', seats: 8, price: '5,200,000 VND' },
  { date: '2025-08-01', seats: 12, price: '5,500,000 VND' },
  { date: '2025-07-01', seats: 10, price: '5,000,000 VND' },

];



  return (
    <div className="w-full min-h-screen z-0 ">
      

      <div className='w-full h-[70px]'></div>

      <div className='mt-[30px] w-full  grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_50px]'>
      
          <div className='col-start-2 flex flex-col '>
                  <h3 className=" text-[38px] font-playfair">{banners[0].name}</h3>
                  <p className="text-[20px]">{banners[0].location}</p>
                  <StarRating rating={4.5} readonly />

                </div>

        <div className='col-start-2 w-full h-[600px] py-5 flex '>
         
      
          {/* Ảnh lớn */}
          <div className='2xl:w-[1050px] 2xl:h-900px] w-[1000px] h-[500px]   '>
            <Image
              src={images[selectedIndex]}
              alt={`Main Image`}
              width={450}
              height={600}
              className="w-full h-full object-cover rounded-[26px] shadow-xl/30"
            />
          </div>

          {/* Ảnh nhỏ */}
          <div className='w-[400px] h-[600px] flex flex-col gap-3 px-3  '>
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                width={320}
                height={120}
                className={`w-[320px] h-[120px] object-cover rounded-[16px] cursor-pointer select-none shadow-xl/30 ${
                  selectedIndex === i ? 'ring-4 ring-[#ff7757]' : ''
                }`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        
                {/* form chọn */}
        
             
          
         
        </div>
           {/* lịch trình tour */}
           <div className='col-start-2 w-full h-full py-5 flex'>
             <div className='w-full  rounded-[26px]  px-5  flex flex-col select-none p-3 bg-[var(--color-2)]/30'>
               <h2 className='text-[30px] mb-4'>Itinerary</h2>
               {Array.isArray(banners[0].lichtrinh) ? (
                 banners[0].lichtrinh.map((item, index) => (
                   <div key={index} className='mb-4'>
                     <h3 className='text-[24px] font-semibold'>{item.title}</h3>
                     <p className='text-[16px] mt-2'>{item.content}</p>
                   </div>
                 ))
               ) : (
                 <p className='text-[16px]'>No itinerary available.</p>
               )}
             </div>
           </div>
           {/* thông tin */}
           <div className='col-start-2 w-full h-[250px] py-5 flex '>
                  <div className='  w-full h-[250px]  flex flex-col select-none p-3 '>
               
              
                <div className='flex flex-col mt-5'>
                  <h2 className='text-[30px]'>Description</h2>
                  <p className="text-[16px] my-5 ">{banners[0].description}</p>
                  <div className='w-full flex gap-5'>
                    <span className=' flex gap-1'>
                     <Clock  size={24} />
                     <span className=" text-[20px] "> 
                      Duration: {banners[0].duration}</span>
                    </span>
                   <span className=' flex gap-1'>
                     <UsersRound  size={24} />
                     <span className=" text-[20px]  ">People: {banners[0].numberOfPeople}</span>
                   </span>

                   <span className=' flex gap-1'>
                      <Bus size={24}/>
                       <span className=" text-[20px]  ">Transportation: {banners[0].transportation}</span>
                   </span>
                  </div>
               
                </div>
                     <div className=' w-[1000px] border mt-5'></div>
              </div>
         
           </div>
           {/* lịch trình tour */}
            <div className='col-start-2  w-full h-[500px] py-5  mb-5' >
              
               <div className='  w-full rounded-[26px] flex flex-col select-none p-3 '>
                <h2 className='text-[30px]'>Tour available</h2>
                <div className='mt-5'>
                  <div className="w-[1000px] max-h-[250px] overflow-y-auto rounded-lg border border-gray-200">
                    <table className="w-full text-left">
                      <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                          <th className="py-2 px-4">Ngày khởi hành</th>
                          <th className="py-2 px-4">Số chỗ còn</th>
                          <th className="py-2 px-4">Giá</th>
                          <th className="py-2 px-4">Đặt tour</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableTours.map((tour, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="py-2 px-4">{tour.date}</td>
                            <td className="py-2 px-4">{tour.seats}</td>
                            <td className="py-2 px-4">{tour.price}</td>
                            <td className="py-2 px-4">
                              <Button color="orange" className="px-4 py-1 text-sm">Đặt ngay</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
               </div>
            </div>
            
      </div>
                   
    </div>
  )
}

export default Page
