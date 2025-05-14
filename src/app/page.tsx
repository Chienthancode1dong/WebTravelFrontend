'use client'
import Image from "next/image";
import images from "@/../public/image";
import Title from "@/conponents/Title";
import BookingBar from "@/conponents/Bookingbar";
import NextPrevButton from "@/conponents/NextPrevButton";

export default function Home() {
  return (
    <main className="w-full min-h-screen z-0 relative">
      {/* Hero Section */}
      <section className="relative w-full h-[1194px] xl:h-[884px]  ">
        <Image
          src={images.background_img}
          alt="Hero Background"
          fill
          className="object-cover object-[0%_90%] brightness-70"
        />
        <div className="absolute w-full top-50 grid 2xl:grid-cols-[180px_1fr_180px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]">
            <div className=" col-start-2 flex flex-col items-start justify-center   z-10">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold max-w-4xl">
                Start your unforgettable journey with us.
              </h1>
              <p className="mt-4 text-white text-base sm:text-lg md:text-xl">
                The best travel for your journey begins now.
              </p>
            </div>
        </div>
        {/* BookingBar */}
        <div className="absolute  bottom-50 grid 2xl:grid-cols-[180px_1fr_180px] xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px] z-20">
          <div className="2xl:w-[1430px] xl:w-[1205px]" >
            <BookingBar />
          </div>
        </div>
      </section>

      {/* Nội dung bên dưới */}
      <section className="w-full h-[1206px] pt-[160px] bg-white text-black  ">
        <div className=" w-full h-full grid 2xl:grid-cols-[180px_1fr_180px]  xl:grid-cols-[60px_1fr_60px]  grid-cols-[50px_1fr_120px]">
          <div className="relative w-full max-h-[165px] col-start-2 z-10 ">
            <Title
              title="Popular Destinations"
              descript="Most popular destinations around the world, from historical places to natural wonders."
              position="left"
            />
            <NextPrevButton />
          </div>
        </div>
      </section>
    </main>
  );
}
