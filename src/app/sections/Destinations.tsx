'use client'
import React, { useState,useRef } from 'react'
import Title from "@/conponents/Title";
import NextPrevButton from "@/conponents/NextPrevButton";
import BannerImg from "@/conponents/bannerImg";
import banners from '@/../public/banners'
const Destinations = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

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
    <div className="w-full h-[706px] bg-white text-black  ">
        <div className="mt-[160px] w-full h-[165px] grid 2xl:grid-cols-[180px_1fr_180px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]">
          <div className="relative w-full max-h-[165px] col-start-2 ">
            <Title
              title="Popular Destinations"
              descript="Most popular destinations around the world, from historical places to natural wonders."
              position="left"
            />
          <NextPrevButton onNext={scrollNext} onPrev={scrollPrev} />
          </div>
          
          
        </div>
          <div className="w-full h-[641px]   grid 2xl:grid-cols-[180px_1fr_180px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]">
           <BannerImg  scrollRef={scrollRef} />
          </div>
    </div>
  )
}

export default Destinations
