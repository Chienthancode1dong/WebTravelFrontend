import React from 'react'
import { assets, cities } from '../../public/assets/assets'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white  bg-cover bg-no-repeat bg-center h-screen relative'>
     <Image src={assets.hero} alt="" className='left-0 absolute bg-cover bg-no-repeat bg-center w-full h-full z-5' width={1920} height={1020} />
      <p className='bg-[#FFD2C7]/50 px-3.5 py-1 rounded-full mt-20 z-10'>The Ultimate Travelling</p>
      <h1 className='font-playfair text-2xl md:text-6xl md:text-[56px] md:leading-[56px] z-10  max-w-xl mt-4 '>Start your unforgettable journey with us. </h1>
      <p className='max-w-130 mt-2 text-sm md:text-base '>The best travel for your jouney begins now</p>

      <form className='z-10 bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <Image src={assets.calenderIcon} alt="" className='h-4' width={16} height={16} />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city, index) => (
                        <option key={index} value={city}/>
                    ))}

                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <Image src={assets.calenderIcon} alt="" className='h-4' width={16} height={16} />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                     <Image src={assets.calenderIcon} alt="" className='h-4' width={16} height={16} />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-[var(--color-1)] py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                 <Image src={assets.searchIcon} alt="searchIcon" className='h-7' width={28} height={28} />
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero
