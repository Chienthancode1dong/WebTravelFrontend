import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../../public/assets/assets'
import Image from 'next/image'

const ExclusiveOffers = () => {
    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
            <div className='flex flex-col items-center md:flex-row justify-between w-full'>
                <Title align='left' title='Ưu đãi độc quyền' subTitle='nhận các ưu đãi cực khủng để có những khoản thời gian vui vẻ bên gai đình và bạn bè' />
                <button className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
                    Xem tất cả ưu đãi
                    <Image src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all' width={20} height={20} />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
                {exclusiveOffers.map((item) => (
                    <div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300' style={{ backgroundImage: `url(${item.image})` }}>
                       <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full '>{item.priceOff}% OFF</p> 
                       <div>
                        <p className='text-2xl font-medium font-playfair'>{item.title}</p>
                        <p>{item.description}</p>
                        <p className='text-xs text-white/70 mt-3'>Thời hạn: {item.expiryDate}</p>
                       </div>
                       <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
                        Xem ưu đãi
                        <Image className='invert group-hover:traslate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon" width={20} height={20} />
                       </button>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default ExclusiveOffers
