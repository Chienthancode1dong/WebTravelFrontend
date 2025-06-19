'use client'
import React, { useState,useRef } from 'react'
import Title from "@/conponents/Title";
import NextPrevButton from "@/conponents/NextPrevButton";
import BannerImg from "@/conponents/bannerImg";
import banners from '@/../public/banners';
import { useInView } from '@/hook/useInView';

const TourAvail = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const { ref, isIntersecting } = useInView<HTMLHeadingElement>();

  const itemWidth = 497 + 16 // width của mỗi ảnh + khoảng cách (nếu có gap-4)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      })
    }
  }

  const scrollNext = () => {
    const nextIndex = (currentIndex + 1) % banners.length
    setCurrentIndex(nextIndex)
    scrollToIndex(nextIndex)
  }

  const scrollPrev = () => {
    const prevIndex = (currentIndex - 1 + banners.length) % banners.length
    setCurrentIndex(prevIndex)
    scrollToIndex(prevIndex)
  }
  return (
      <div className="w-full h-[806px] bg-white text-black  ">
        <div className="mt-[70px] w-full h-[165px] grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]">
          <div ref={ref} className={`relative w-full max-h-[165px] select-none col-start-2 transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}>
            <Title
              title="TOUR NỔI BẬC"
              descript="Most popular destinations around the world, from historical places to natural wonders."
              position="left"
            />
          <NextPrevButton position='' onNext={scrollNext} onPrev={scrollPrev} />
          </div>
          
          
        </div>
          <div ref={ref}  className={`w-full h-[641px]   grid 2xl:grid-cols-[120px_1fr_120px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px] transition-all duration-900 ease-out transform ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}>
           <BannerImg  scrollRef={scrollRef} />
          </div>
    </div>
  )
}

export default TourAvail
