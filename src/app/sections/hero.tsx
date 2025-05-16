import React from 'react'
import Image from "next/image";
import images from "@/../public/image";
import BookingBar from "@/conponents/Bookingbar";
import { useInView } from '@/hook/useInView'

const Hero = () => {    // <-- sửa tên component thành 'Hero'
const { ref, isIntersecting } = useInView<HTMLHeadingElement>();
  return (
    <div className="relative w-full h-[1194px] xl:h-[884px]">
        <Image
          src={images.background_img}
          alt="Hero Background"
          fill
          className="object-cover object-[0%_90%] brightness-70"
        />
        <div className="absolute w-full top-50 grid 2xl:grid-cols-[180px_1fr_180px] xl:grid-cols-[60px_1fr_60px] grid-cols-[50px_1fr_120px]">
            <div className="col-start-2 flex flex-col items-start justify-center z-10">
              <h1
                ref={ref}
                className={`text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold max-w-4xl transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Start your unforgettable journey with us.
              </h1>
              <p 
               ref={ref}
               className={`mt-4 text-white text-base sm:text-lg md:text-xltransition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                The best travel for your journey begins now.
              </p>
            </div>
        </div>
        {/* BookingBar */}
        <div className="absolute bottom-50 grid 2xl:grid-cols-[180px_1fr_180px] xl:grid-cols-[60px_1fr_60px] grid-cols-[50px_1fr_120px] z-20">
          <div className="2xl:w-[1430px] xl:w-[1205px]">
            <BookingBar />
          </div>
        </div>
    </div>
  )
}

export default Hero
