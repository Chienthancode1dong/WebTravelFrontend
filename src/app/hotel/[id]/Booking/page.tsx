'use client'
import React, { useState } from 'react'

import banners from '../../../../../public/banners'
import {Button} from '@/conponents/Button'
const scheduleDetail = {
    dayStart: '2023-10-01',
    dayEnd: '2023-10-07',
    price:'200',
    slot: 5,

  }
const hotelBookingDetail = {
  hotel: {
    name: 'Khách sạn Mặt Trời',
    address: '123 Đường Biển, Quận 1, TP. HCM',
    images: [
      '/images/hotel1.jpg',
      '/images/hotel2.jpg'
    ],
    description: 'Khách sạn 5 sao với view biển tuyệt đẹp, đầy đủ tiện nghi.',
    rating: 4.7,
    phone: '0123 456 789',
    email: 'info@sunhotel.com',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    policies: 'Không hút thuốc, không mang thú cưng.',
  },
  room: {
    pricePerNight: 1200000,
    maxGuests: 4,
    amenities: ['Wifi miễn phí', 'Bể bơi', 'Ăn sáng', 'Điều hòa'],
  }
};
const Booking = () => {
  const [numberOfPeople,setnumberOfPeopl]=useState<Number>() // This should be dynamic based on user input
  // Tính tổng chi phí dựa trên giá và số người (dùng state numberOfPeople)
  // Đảm bảo priceNumber là number, nếu không thì 0
  const priceNumber = Number(String(scheduleDetail.price).replace(/[^\d.]/g, '')) || 0;
  const totalCost = priceNumber * (typeof numberOfPeople === 'number' && !isNaN(numberOfPeople) ? numberOfPeople : 0);
  // Lấy số slot còn lại từ scheduleDetail.slot (giả sử đã có object scheduleDetail)
const maxSlots = scheduleDetail?.slot ?? 0;
  return (
    <div className='flex flex-col h-screen bg-[#f6f7f9]'>
        <Header opacity='' />
         <div className='flex mt-20 items-center justify-between px-34 md:px-38 '>
             <h1 className='text-black text-[30px]   mt-10'>Booking your tour</h1>
         </div>
         <div className='flex  text-[16px] items-center justify-between mt-10 mx-34 md:mx-38 p-10 gap-10 bg-white rounded-lg shadow-lg border border-gray-300'>
              <div className='flex flex-col  gap-2 text-[20px]  px-10 md:px-15 py-5 rounded-lg  border border-gray-300'>
                {/* Destination/Hotel Info */}
<div className="mb-6">
  <h1 className="text-3xl font-bold mb-2">{hotelBookingDetail.hotel.name}</h1>
  <p className="text-gray-600 mb-2">{hotelBookingDetail.hotel.address}</p>
  <p className="text-lg font-semibold">Giá mỗi đêm: <span className="text-orange-600">{hotelBookingDetail.room.pricePerNight.toLocaleString()} VND</span></p>
  <p className="text-sm text-gray-500">Số khách tối đa: {hotelBookingDetail.room.maxGuests}</p>
  <div className="flex flex-wrap gap-2 mt-2">
    {hotelBookingDetail.room.amenities.map((item: string, idx: number) => (
      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">{item}</span>
    ))}
  </div>
  <p className="mt-4 text-gray-700">{hotelBookingDetail.hotel.description}</p>
  <p className="mt-2 text-yellow-600 font-medium">Đánh giá: {hotelBookingDetail.hotel.rating} ⭐</p>
  <p className="mt-2 text-gray-500">Liên hệ: {hotelBookingDetail.hotel.phone} | {hotelBookingDetail.hotel.email}</p>
  <p className="mt-2 text-gray-500">Nhận phòng: {hotelBookingDetail.hotel.checkInTime} - Trả phòng: {hotelBookingDetail.hotel.checkOutTime}</p>
  <p className="mt-2 text-gray-500">Chính sách: {hotelBookingDetail.hotel.policies}</p>
</div>
              <strong>Duration:</strong><span>{scheduleDetail.dayStart} to {scheduleDetail.dayEnd}</span>
              <strong>Price:</strong><span> {scheduleDetail.price} USD</span>
              </div>
          <form>
 {/* Input cho số người và hiển thị tổng chi phí động */}
              <div className='flex text-[20px] items-center mt-5 gap-5'>
                  <strong> Number of People:</strong><span>{banners[0].numberOfPeople}</span>
              </div>
              <div className="flex items-center gap-2 my-6 p-4 bg-white rounded-xl shadow border w-full max-w-md">
  <label htmlFor="numberOfPeople" className="block font-medium text-gray-700 mr-2">Số người:</label>
  <input
    id="numberOfPeople"
    type="number"
    min={1}
    max={maxSlots}
    value={numberOfPeople === 0 ? '' : Number(numberOfPeople)}
    onChange={e => {
      const val = Number(e.target.value);
      if (val > maxSlots) setnumberOfPeopl(maxSlots);
      else setnumberOfPeopl(val);
    }}
    placeholder="0"
    className="border border-gray-300 rounded px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-orange-400 text-center"
  />
  <p className="text-sm text-gray-500 mt-1">Số slot còn lại: {maxSlots}</p>
  <button
    type="button"
    className="ml-2 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition cursor-pointer"
    onClick={() => setnumberOfPeopl(1)}
    aria-label="Đặt lại số người về 1"
  >
    Đặt lại
  </button>
</div>
                <div className="text-lg  mt-4 ">
                  <strong>Total price:</strong>  <span className="text-orange-600">{isNaN(totalCost) || !numberOfPeople ? 0 : totalCost.toLocaleString()} USD</span>
                    <Button color='orange' className='w-[80px] text-[20px] ml-5'  >Book</Button>    
               </div>
                <span>Only pay by zalo pay</span>
          </form>
          
         </div>
    </div>
  )
}

export default Booking
