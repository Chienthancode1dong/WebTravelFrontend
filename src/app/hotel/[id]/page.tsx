'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../../../../public/assets/assets'
import StartRating from '../../../components/StartRating'
import Image, { StaticImageData } from 'next/image'
import { FC } from 'react';


// Type definitions for room and hotel
interface UserType {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  recentSearchedCities: string[];
}

interface HotelType {
  _id: string;
  name: string;
  address: string;
  contact: string;
  owner: UserType;
  city: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RoomType {
  _id: string;
  hotel: HotelType;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images: (string | StaticImageData)[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface RoomDetailPageProps {
  params: Promise<{ id: string }>;

}
const RoomDetails: FC<RoomDetailPageProps> = ({ params }) => {
    const { id } = React.use(params);
    const [room, setRoom] = useState<RoomType | null>(null);
    const [mainImage, setMainImage] = useState<string | StaticImageData>("");

    useEffect(() => {
        if (!id) return; // Nếu chưa có id thì không làm gì
        const foundRoom = roomsDummyData.find((room:RoomType) => room._id === id);

        if (foundRoom) {
            setRoom(foundRoom);
            setMainImage(foundRoom.images[0]);
        }
    }, [id]);
    if (!room) return null;
    return (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/*chi tiết phòng (header) */}
            <div className='flex flex-col md:flex-row items-start gap-2 md:items-center'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name}<span className='font-inter text-sm'>({room.roomType})</span></h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-[var(--color-3)] rounded-full'>Giảm 20%</p>
            </div>
            {/*đánh giá */}
            <div className='flex items-center gap-1 mt-2'>
                <StartRating />
                <p className='ml-2'>100+ reviews</p>
            </div>
            {/*địa chỉ phòng */}
            <div className='flex items-center gap-1 mt-2 text-gray-500'>
                <Image src={assets.locationIcon} alt="location-icon" width={20} height={20} />
                <span>{room.hotel.address}</span>
            </div>
            {/*hình ảnh phòng */}
            <div className='flex flex-col lg:flex-row items-start gap-6 mt-6'>
                <div className='lg:w-1/2 w-full'>
                    <Image src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' width={600} height={400} />
                </div>
                <div className='grid grid-cols-2 lg:w-1/2 w-full gap-4 '>
                    {room.images.length > 1 && room.images.map((image, index) => (
                        <Image onClick={() => setMainImage(image)} key={index} src={typeof image === 'string' ? image : image.src} alt='Room Image' className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image ? 'outline-3 outline-[var(--color-1)]/50' : ''}`} width={200} height={140} />
                    ))}
                </div>
            </div>
            {/*thông tin phòng */}
            <div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Với cơ sở tiện nghi và hiện đại nhất</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item: string, index: number) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-2)]/50'>
                                <Image src={facilityIcons[item as keyof typeof facilityIcons] ?? ""} alt={item} className='w-5 h-5' width={20} height={20} />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/*giá phòng */}
                <p className='text-2xl font-medium'>{room.pricePerNight}.000 VND/đêm</p>
            </div>
            {/*check in/out  */}
            <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-xl p-6 mt-16 mx-auto max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Ngày Vào</label>
                        <input type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Ngày Ra</label>
                        <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="Guest" className='font-medium'>Số Lượng</label>
                        <input type="number" id='Guest' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>
                <button  type='submit' className='bg-[var(--color-1)] hover:bg-[var(--color-2)]/50 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer hover:text-gray-700 '>   
                    Đặt ngay
                </button>
            </form>
            {/*thông tin thêm */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec: {icon: string, title: string, description: string}, index: number) => (
                    <div key={index} className='flex items-start gap-2'>
                        <Image src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' width={26} height={26} />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p>khách hàng sẽ cảm thấy thoải mái và dễ chịu</p>
            </div>
            {/*Chủ ks */}
            <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                    <Image src={assets.userIcon} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full invert opacity-80' width={56} height={56} />
                    <div>
                        <p className='text-lg md:text-xl'>Chủ Khách Sạn: {room.hotel.name}</p>
                        <div className='flex items-center mt-1'>
                            <StartRating />
                            <p className='ml-2'>100+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='px-6 py-2.5 mt-4 rounded text-white bg-[var(--color-1)] hover:bg-[var(--color-2)]/50 transition-all cursor-pointer hover:text-gray-700'>Liên hệ ngay</button>

            </div>
        </div>
    )
}

export default RoomDetails
