import React from 'react'
import Image from 'next/image';
import { assets } from '../../public/assets/assets'

const Footer = () => {
  return (
    <div className='bg-[#0A0808cc] text-white pt-8 px-6 md:px-16 lg:px-24 xl:px-32 z-0'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <Image src={assets.logo} alt="logo" width={100} height={36} className='mb-4 h-8 md:h-9 invert opacity-80' />
                    <p className='text-sm'>
                        Nơi bạn có thể tìm thấy những nơi lưu trú tốt nhất với giá cả hợp lý nhất. Chúng tôi cung cấp cho bạn những trải nghiệm tuyệt vời nhất với những dịch vụ tốt nhất.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Instagram */}
                        <Image src={assets.instagramIcon} alt="instagram-icon" width={24} height={24} className='w-6 bg-[#fff] rounded-[5px]' />
                        {/* Facebook */}
                        <Image src={assets.facebookIcon} alt="facebook-icon" width={24} height={24} className='w-6 bg-[#fff] rounded-[5px]' />
                        {/* Twitter */}
                        <Image src={assets.twitterIcon} alt="twitter-icon" width={24} height={24} className='w-6 bg-[#fff] rounded-[5px]' />
                        {/* Linkendin */}
                        <Image src={assets.linkendinIcon} alt="linkendin-icon" width={24} height={24} className='w-6 bg-[#fff] rounded-[5px]' />
                    </div>
                </div>

                <div>
                    <p className='font-playfair text-lg text-white'>COMPANY</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>

                <div>
                    <p className='font-playfair text-lg text-white'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Accessibility</a></li>
                    </ul>
                </div>

                <div className='font-playfair max-w-80'>
                    <p className='text-lg text-white'>STAY UPDATED</p>
                    <p className='mt-3 text-sm'>
                        đang ký để nhận thông tin mới nhất về các ưu đãi và khuyến mãi đặc biệt từ chúng tôi.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input type="text" className='bg-white text-black rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                        <button className='flex items-center justify-center bg-[var(--color-1)] h-9 w-9 aspect-square rounded-r'>
                            {/* Arrow icon */}
                           <Image src={assets.arrowIcon} alt="arrow-icon" width={14} height={14} className='w-3.5 invert'/>
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer
