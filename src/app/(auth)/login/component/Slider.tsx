'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'

// Định nghĩa dữ liệu cho mỗi slide
const sliderData = [
  {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    heading: "Escape the Ordinary,\nEmbrace the Journey!",
    subtext: "Experience the world your way!",
    tooltip: "Wander, Explore, Experience.",
    tooltipText: "Discover amazing adventures, embrace unforgettable travel memories worldwide."
  },
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    heading: "Discover New Places,\nCreate New Memories",
    subtext: "Every journey begins with a single step",
    tooltip: "Travel Smart, Travel Far",
    tooltipText: "Find hidden gems and authentic experiences wherever you go."
  },
  {
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    heading: "Adventure Awaits,\nJust a Click Away",
    subtext: "Book your dream vacation today",
    tooltip: "Safe Travels, Amazing Stories",
    tooltipText: "Our travel experts ensure every detail is perfect for unforgettable journeys."
  }
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Chuyển đổi tự động sau mỗi 5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNextSlide = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
      setIsChanging(false);
    }, 500);
  };

  const handlePrevSlide = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
      setIsChanging(false);
    }, 500);
  };

  const currentSlide = sliderData[currentIndex];

  return (
    <div className="w-full md:w-1/2 relative overflow-hidden">
      {/* Background Images */}
      <div className="relative w-full h-full">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Travel destination ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Top tooltip */}
      <div className="absolute top-8 right-8 z-10">
        <div 
          className={`bg-white p-4 rounded-lg max-w-xs transition-all duration-1000 transform ${
            isChanging ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="flex items-start gap-2">
            <div className="mt-1 w-2 h-2 rounded-full bg-red-500"></div>
            <div>
              <h3 className="text-md font-medium">{currentSlide.tooltip}</h3>
              <p className="text-xs text-gray-600 mt-1">{currentSlide.tooltipText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-20 right-4 z-10 text-white text-right">
        <h4 
          className={`text-xl font-light transition-all duration-500 whitespace-pre-line ${
            isChanging ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
          }`}
        >
          {currentSlide.heading}
        </h4>
        <Link href="/explore" 
          className={`mt-4 px-6 py-2 bg-white/30 rounded-full text-sm hover:bg-white/60  hover:text-black  hover: scale-105 transition-all duration-300 ${
            isChanging ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          {currentSlide.subtext}
        </Link>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
        <button 
          onClick={handlePrevSlide} 
          className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-50 transition-all">
          <Image src={"/right-arrow.png"} alt = "Previous" width={16} height={16} className="transform rotate-180" />
        </button>
        
        {/* Dots Indicator */}
        <div className="flex gap-2 items-center">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsChanging(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsChanging(false);
                }, 500);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-4" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNextSlide}
          className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-30 rounded-full text-white hover:bg-opacity-50 transition-all"
        >
            <Image src={"/right-arrow.png"} alt = "Next" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}