import React  from 'react'
import Image from "next/image";
import images from "@/../public/image";
import BookingBar from "@/conponents/Bookingbar";
import { useInView } from '@/hook/useInView'

const Hero = () => {    // <-- sửa tên component thành 'Hero'
const { ref, isIntersecting } = useInView<HTMLHeadingElement>();


  return (
    <div className="relative w-full  2xl:h-[1094px] h-[884px] overflow-hidden">
        <Image
          src={images.background_img}
          alt="Hero Background"
          fill  
          className="mask-size-[auto_100px] bg-center object-cover object-[0%_90%] brightness-70 animate-fadeDown "
        />
        <div className="absolute w-full top-50 grid 2xl:grid-cols-[120px_1fr_120px] xl:grid-cols-[60px_1fr_60px] grid-cols-[50px_1fr_50px]">
            <div className="col-start-2 flex flex-col items-start justify-center z-10">
              <h1
                ref={ref}
                className={`text-white select-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold max-w-4xl transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                Start your unforgettable journey with us.
              </h1>
              <p 
               ref={ref}
               className={`mt-4 text-white select-none text-base sm:text-lg md:text-xl transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                The best travel for your journey begins now.
              </p>
            </div>
        </div>
        {/* BookingBar */}
        <div className="absolute 2xl:bottom-90 bottom-50 grid 2xl:grid-cols-[120px_1fr_120px] xl:grid-cols-[60px_1fr_60px] grid-cols-[50px_1fr_120px] z-20">
          <div     ref={ref}  className={`2xl:w-[1430px] xl:w-[1205px] transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
            <BookingBar />
          </div>
        </div>
    </div>
  )
}

export default Hero
