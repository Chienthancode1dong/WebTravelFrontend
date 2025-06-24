'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import {Button} from '@/conponents/Button';
import StarRating from '@/conponents/StarRating';
import {Clock,UsersRound,Bus } from 'lucide-react'
import Link from 'next/link';
import authApi from '@/lib/auth-api';
import { useParams } from 'next/navigation';
import CommentTour from '@/conponents/commentTour';
const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // state để lưu ảnh đang chọn
  const [postTours, setPostTour] = useState<any>({}); // state để lưu dữ liệu tour 
  const params = useParams();
  const id = params.ID_tour;

useEffect (() => {
    try {
      const fetchData = async () => {
        console.log('Fetching tour data for ID:', id);
        const res = await authApi.getTourById(String(id));
        console.log('Tour data:', res.data.pourTour);
        setPostTour(res.data.pourTour);
      };
      fetchData();
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
}, []);
  return (
    <div className="w-full min-h-screen z-0 ">
      

      <div className='w-full h-[70px]'></div>

      <div className='mt-[30px] mb-[150px] w-full  grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_50px]'>
      
          <div className='col-start-2 flex flex-col '>
                  <h3 className=" text-[38px] font-playfair">{postTours.destination}</h3>
                  <p className="text-[20px]">{postTours.city}</p>
                  <StarRating rating={4.5} readonly />

                </div>

        <div className='col-start-2 w-full h-[600px] py-5 flex '>
         
      
          {/* Ảnh lớn */}
          <div className='2xl:w-[1050px] 2xl:h-900px] w-[1000px] h-[500px]   '>
            {Array.isArray(postTours.image) && postTours.image.length > 0 && (
            <Image
              src={`http://localhost:8080${postTours.image[selectedIndex]}`}
              alt={`Main Image`}
              width={450}
              height={600}
              className="w-full h-full object-cover rounded-[26px] shadow-xl/30"
            />
            )}
          </div>

          {/* Ảnh nhỏ */}
          <div className='w-[400px] h-[600px] flex flex-col gap-3 px-3'>
          {Array.isArray(postTours.image) &&
            postTours.image.map((img: string, i: number) => (
              <Image
                key={i}
                src={`http://localhost:8080${img}`}
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
               {Array.isArray(postTours.scheduleDetail) ? (
                 postTours.scheduleDetail.map((item: { title: string; description: string }, index: number) => (
                   <div key={index} className='mb-4'>
                     <h3 className='text-[24px] font-semibold'>{item.title}</h3>
                     <p className='text-[16px] mt-2'>{item.description}</p>
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
                  <p className="text-[16px] my-5 ">{postTours.description}</p>
                  <div className='w-full flex gap-5'>
                    <span className=' flex gap-1'>
                     <Clock  size={24} />
                     <span className=" text-[20px] "> 
                      Duration: {postTours.duration}</span>
                    </span>
                   <span className=' flex gap-1'>
                     <UsersRound  size={24} />
                     <span className=" text-[20px]  ">People: {postTours.numberOfPeople}</span>
                   </span>

                   <span className=' flex gap-1'>
                      <Bus size={24}/>
                       <span className=" text-[20px]  ">Transportation: {postTours.transportation}</span>
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
                        {(Array.isArray(postTours.scheduleTour) ? postTours.scheduleTour : []).map((tour: { startDate: string; limitQuantity: number; price: number }, idx: number) => (
                          <tr key={idx} className="border-t">
                            <td className="py-2 px-4">{tour.startDate}</td>
                            <td className="py-2 px-4">{tour.limitQuantity}</td>
                            <td className="py-2 px-4">{tour.price}</td>
                            <td className="py-2 px-4">
                              <Link href={`/Tour/${id}/${postTours.id}`} className="inline-block">
                                  <Button color="orange" className="px-4 py-1 text-sm">Đặt ngay</Button>
                              </Link>
                            </td>
                              
                              
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
               </div>
            </div>
            {/* comment */}
            <div className='col-start-2  w-full max-h-[800px] py-5  mb-5'>
              <CommentTour/>
            </div>
      </div>
                   
    </div>
  )
}

export default Page
