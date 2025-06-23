import React from 'react'
import Link from 'next/link'
import { assets } from '../../public/assets/assets'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

interface HotelCardProps {
  room: {
    _id: string;
    images: (string | StaticImageData)[];
    pricePerNight: number;
    hotel: {
      name: string;
      address: string;
    };
  };
  index: number;
}

const HotelCard: React.FC<HotelCardProps> = ({ room, index }) => {
  return (
    <Link href={`/hotel/${room._id}`} scroll={false} className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-2 transition duration-300'>
      <Image
        src={typeof room.images[0] === 'string' ? room.images[0] : (room.images[0] as StaticImageData).src}
        alt={room.hotel.name}
        width={280}
        height={180}
        className=" h-[180px] object-cover"
        priority={index < 2}
      />
      { index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full '>Đặt nhiều</p>}
      <div className='p-4 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='font-playfair text-xl font-medium text-gray-800'>{room.hotel.name}</p>
          <div className='flex items-center gap-2'>
            <Image src={assets.starIconFilled} alt="star-icon" width={18} height={18} />4.9
          </div>
        </div>
        <div className='flex items-center gap-2 mt-1 text-sm'>
           <Image src={assets.locationIcon} alt="location-icon" width={16} height={16} />
           <span>{room.hotel.address}</span>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <p><span className='text-xl text-gray-800'>{room.pricePerNight}.000 VND</span>/đêm</p>
          <button className='px-1 py-2 text-sm border border-gray-300 rounded hover:bg-[var(--color-1)] hover:text-white transition-all cursor-pointer'>ĐẶT NGAY</button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
