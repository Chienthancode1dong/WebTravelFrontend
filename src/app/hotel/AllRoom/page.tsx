'use client'
import React, { useEffect, useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../../../../public/assets/assets'
import StartRating from '../../../components/StartRating'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import authApi from '@/lib/auth-api'

interface RoomType {
  id: string;
  hotelId: {
    name:string,
    address:string
  };
  type_room: string;
  price: number;
  image: (string | StaticImageData)[];
  status: boolean;
  description: string;
  area: string;
}


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

const AllRooms = () => {
    const [openFilters, setOpenFilters] = useState(false)
    const [roomData,setroomData] = useState<RoomType[]>([])
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
    const getAllRooms = async()=>{
        const res = await authApi.getallRoom()
        console.log(res.data.roomsFromHotel)
        setroomData(res.data.roomsFromHotel)
    }
    useEffect(()=>{
        getAllRooms()
    },[])
    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 '>
            <div>
                <div className='flex flex-col items-start text-left'>
                    <h1 className=' font-playfair text-4xl md:text-[40px]'>Tất cả phòng</h1>
                    <p className=' text-sm md:text-base text-gray-500/90 mt-2 max-w-174'> Mỗi phòng đều mang lại một vẻ đẹp và sự tiện nghi riêng</p>
                </div>
                {roomData.map((room) => (
                    <div key={room.id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                        <Link href={`/hotel/${room.id}`} scroll={false} className='md:w-1/2'>
                          <Image src={typeof room.image[0] === 'string' ? `http://localhost:8080${room.image[0]}` : room.image[0].src} alt="hotel-img" title='Chi tiết phòng' className='max-h-65 w-full rounded-xl shadow-lg object-cover cursor-pointer' width={400} height={260} />
                        </Link>
                        <div className='md:w-1/2 flex flex-col gap-2'>
                            <p className='text-gray-500'>{room.hotelId.address}</p>
                            <Link href={`/hotel/${room.id}`} scroll={false} className='text-gray-800 text-3xl font-playfair cursor-pointer'>
                              {room.hotelId.name}
                            </Link>
                            <div className='flex items-center'>
                                <StartRating />
                                <p className='ml-2'>100+ reviews</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-500 text-sm mt-2'>
                                <Image src={typeof assets.locationIcon === 'string' ? assets.locationIcon : assets.locationIcon.src} alt="loaction-icon" width={20} height={20} />
                                <span>{room.hotelId.address}</span>
                            </div>
                            <p className='text-xl font-medium text-gray-700'>{room.price}.000 VND/đêm</p>
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

export default AllRooms
